

const whatsAppMessage = {
    en: `Hello from yamak app . I need your help with  `,
    ar: `مرحبا بك من تطبيق يمك . احتاج الى المساعده في `
}

export function getWhatsAppMessage(lang: "en" | "ar" = "en", serviceName: string[]) {

    return whatsAppMessage[lang] + ` [ ${serviceName.join(" --- ")} ]`


}