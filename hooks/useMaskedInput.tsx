import { useState } from "react";

const formatCNPJ = (cnpj: string, revert: boolean = false): string => {
  if (revert) {
    return cnpj.replace(/\D/g, "").slice(0, 14);
  }

  const cleanCNPJ = cnpj.replace(/\D/g, "").slice(0, 14);

  if (cleanCNPJ.length <= 14) {
    const parts = [
      cleanCNPJ.slice(0, 2),
      cleanCNPJ.slice(2, 5),
      cleanCNPJ.slice(5, 8),
      cleanCNPJ.slice(8, 12),
      cleanCNPJ.slice(12, 14),
    ];

    return `${parts[0]}.${parts[1]}.${parts[2]}/${parts[3]}-${parts[4]}`;
  }

  return cnpj;
};

const formatPhone = (phone: string, revert: boolean = false): string => {
  if (revert) {
    return phone.replace(/\D/g, "");
  }

  const cleanPhone = phone.replace(/\D/g, "").slice(0, 11);

  if (cleanPhone.length <= 11) {
    return cleanPhone
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  return phone;
};

export const useMaskedInput = (
  initialValue: string = "",
  type: "CNPJ" | "phone"
) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (text: string) => {
    setValue(type === "CNPJ" ? formatCNPJ(text) : formatPhone(text));
  };

  const clear = () => {
    setValue("");
  };

  const getRawValue = () => {
    return type === "CNPJ" ? formatCNPJ(value, true) : formatPhone(value, true);
  };

  return {
    value,
    onChangeText: handleChange,
    clear,
    getRawValue,
  };
};
