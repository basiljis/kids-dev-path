import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Product } from "@/lib/universum-data";

interface BillingFormProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BillingForm({ product, open, onOpenChange }: BillingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    inn: "",
    kpp: "",
    address: "",
    bankName: "",
    bik: "",
    account: "",
    email: "",
  });

  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Загружаем базовые данные из профиля
        setFormData(prev => ({
          ...prev,
          fullName: user.user_metadata?.['full_name'] || "",
          email: user.email || "",
        }));
        
        // Пытаемся загрузить сохраненные реквизиты из localStorage (имитация сохранения в профиле)
        const saved = localStorage.getItem("universum_billing_data");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setFormData(prev => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error("Failed to parse saved billing data", e);
          }
        }
      }
    }

    if (open) {
      loadUserData();
    }
  }, [open]);

  const handleDownload = async () => {
    setLoading(true);
    
    // Сохраняем данные для последующего автозаполнения
    localStorage.setItem("universum_billing_data", JSON.stringify(formData));

    // Имитация генерации и скачивания счета
    setTimeout(() => {
      setLoading(false);
      
      const content = `
СЧЁТ НА ОПЛАТУ № ${Math.floor(Math.random() * 10000)}
Дата: ${new Date().toLocaleDateString('ru-RU')}

ПОСТАВЩИК: ИП Загладин В.С.
ИНН: 772870183180
ОГРНИП: 321774600609346
Банк: АО "ТИНЬКОФФ БАНК"
БИК: 044525974
К/с: 30101810300000000974
Р/с: 40802810900002821360

ПОКУПАТЕЛЬ: ${formData.fullName}
ИНН: ${formData.inn}
КПП: ${formData.kpp || '-'}
Адрес: ${formData.address}

НАИМЕНОВАНИЕ ТОВАРА: ${product.name}
СУММА К ОПЛАТЕ: ${product.pricePurchase} руб.
      `;
      
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${product.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Счёт успешно сформирован и скачан");
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Оплата по реквизитам
          </DialogTitle>
          <DialogDescription>
            Заполните данные для формирования счёта на покупку {product.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Наименование организации / ФИО</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="ООО 'Компания' или Иванов Иван Иванович"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="inn">ИНН</Label>
              <Input
                id="inn"
                value={formData.inn}
                onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
                placeholder="10 или 12 цифр"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="kpp">КПП</Label>
              <Input
                id="kpp"
                value={formData.kpp}
                onChange={(e) => setFormData({ ...formData, kpp: e.target.value })}
                placeholder="9 цифр (если есть)"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Юридический адрес</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Индекс, город, улица, дом"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bankName">Наименование банка</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              placeholder="Напр. ПАО Сбербанк"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="bik">БИК</Label>
              <Input
                id="bik"
                value={formData.bik}
                onChange={(e) => setFormData({ ...formData, bik: e.target.value })}
                placeholder="9 цифр"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="account">Расчетный счет</Label>
              <Input
                id="account"
                value={formData.account}
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                placeholder="20 цифр"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email для связи</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@mail.ru"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleDownload} disabled={loading || !formData.fullName || !formData.inn}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Формирование...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Скачать счёт
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
