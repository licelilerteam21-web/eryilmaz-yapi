const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| PUBLIC DOSYALARI
|--------------------------------------------------------------------------
*/

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));


/*
|--------------------------------------------------------------------------
| ANA SAYFA
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});


/*
|--------------------------------------------------------------------------
| SAĞLIK KONTROLÜ
|--------------------------------------------------------------------------
*/

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        company: "Eryılmaz Yapı İnşaat",
        status: "online"
    });
});


/*
|--------------------------------------------------------------------------
| İLETİŞİM API
|--------------------------------------------------------------------------
*/

app.post("/api/contact", (req, res) => {

    const {
        name,
        phone,
        email,
        service,
        message
    } = req.body || {};

    if (!name || !phone || !message) {
        return res.status(400).json({
            success: false,
            message: "Ad, telefon ve mesaj alanları zorunludur."
        });
    }

    console.log("\n====================================");
    console.log("ERYILMAZ YAPI - YENİ İLETİŞİM");
    console.log("====================================");
    console.log("Ad Soyad :", name);
    console.log("Telefon  :", phone);
    console.log("E-posta  :", email || "Belirtilmedi");
    console.log("Hizmet   :", service || "Belirtilmedi");
    console.log("Mesaj    :", message);
    console.log("====================================\n");

    res.json({
        success: true,
        message: "Talebiniz başarıyla alındı."
    });
});


/*
|--------------------------------------------------------------------------
| AI DESTEK API
|--------------------------------------------------------------------------
|
| API anahtarı daha sonra .env dosyasından alınacak.
| Anahtar kesinlikle public klasörüne konulmayacak.
|
|--------------------------------------------------------------------------
*/

app.post("/api/ai", async (req, res) => {

    const { message } = req.body || {};

    if (!message) {
        return res.status(400).json({
            success: false,
            message: "Mesaj boş bırakılamaz."
        });
    }

    /*
     * Şimdilik temel şirket asistanı.
     * Gerçek AI bağlantısını burada güvenli şekilde
     * backend üzerinden bağlayacağız.
     */

    const text = String(message).toLocaleLowerCase("tr-TR");

    let answer =
        "Merhaba! Eryılmaz Yapı İnşaat'a hoş geldiniz. " +
        "Size hizmetlerimiz ve projeniz hakkında yardımcı olabilirim.";


    if (
        text.includes("hizmet") ||
        text.includes("ne yap") ||
        text.includes("iş")
    ) {

        answer =
            "Eryılmaz Yapı İnşaat olarak alçı, boya, sıva, " +
            "iç ve dış cephe uygulamaları, dekoratif uygulamalar, " +
            "seramik, fayans, alçıpan, çatı, kiremit, demir işleri, " +
            "prefabrik ve çeşitli yapı uygulamalarında hizmet veriyoruz.";

    }


    else if (
        text.includes("fiyat") ||
        text.includes("teklif") ||
        text.includes("maliyet") ||
        text.includes("ücret")
    ) {

        answer =
            "Projenize özel fiyatlandırma için yapılacak işi, " +
            "yaklaşık metrekare bilgisini ve bulunduğunuz bölgeyi " +
            "paylaşabilirsiniz. Hızlı iletişim için WhatsApp üzerinden " +
            "0531 299 04 72 numarasına ulaşabilirsiniz.";

    }


    else if (
        text.includes("whatsapp") ||
        text.includes("telefon") ||
        text.includes("ulaş")
    ) {

        answer =
            "Eryılmaz Yapı İnşaat WhatsApp iletişim numarası: " +
            "0531 299 04 72";

    }


    else if (
        text.includes("mail") ||
        text.includes("gmail") ||
        text.includes("e-posta") ||
        text.includes("email")
    ) {

        answer =
            "E-posta adresimiz: " +
            "info@eryilmazinsaat48.com";

    }


    else if (
        text.includes("alçı") ||
        text.includes("alcipan")
    ) {

        answer =
            "Alçı ve alçıpan uygulamaları, asma tavan ve " +
            "iç mekân yüzey çalışmalarında hizmet veriyoruz.";

    }


    else if (
        text.includes("boya") ||
        text.includes("sıva") ||
        text.includes("siva")
    ) {

        answer =
            "İç ve dış cephe boya ile sıva uygulamaları yapıyoruz. " +
            "Projenin durumuna göre uygun uygulama yöntemi belirlenir.";

    }


    else if (
        text.includes("seramik") ||
        text.includes("fayans")
    ) {

        answer =
            "Banyo, mutfak ve yaşam alanları için seramik ve fayans " +
            "uygulamaları gerçekleştiriyoruz.";

    }


    else if (
        text.includes("çatı") ||
        text.includes("cati") ||
        text.includes("kiremit")
    ) {

        answer =
            "Çatı ve kiremit uygulamalarında bakım, yenileme ve " +
            "yapım çalışmalarında hizmet sunuyoruz.";

    }


    else if (
        text.includes("merhaba") ||
        text.includes("selam")
    ) {

        answer =
            "Merhaba! Eryılmaz Yapı İnşaat'a hoş geldiniz. " +
            "Projeniz hakkında nasıl yardımcı olabilirim?";

    }


    res.json({
        success: true,
        answer
    });
});


/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {

    res.status(404).sendFile(
        path.join(publicPath, "index.html")
    );

});


/*
|--------------------------------------------------------------------------
| SUNUCU
|--------------------------------------------------------------------------
*/

app.listen(PORT, "0.0.0.0", () => {

    console.log("");
    console.log("========================================");
    console.log("      ERYILMAZ YAPI İNŞAAT");
    console.log("========================================");
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
    console.log(`Port: ${PORT}`);
    console.log("Durum: ONLINE");
    console.log("========================================");
    console.log("");

});
