import { defineConfig } from "vitepress";
import { redirects, makeRedirectHtml } from "./_redirects";
import fs from "fs";
import path from "path";

// Function to generate sitemap
function generateSitemap(outputDir) {
  const baseUrl = "https://docs.bagisto.com";
  const srcDir = path.join(process.cwd(), "src");

  const getAllMarkdownFiles = (dir, prefix = "") => {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      const pathPrefix = prefix ? `${prefix}/${entry.name}` : entry.name;

      if (entry.isDirectory() && entry.name !== "public") {
        files.push(...getAllMarkdownFiles(fullPath, pathPrefix));
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".md") &&
        entry.name !== "index.md"
      ) {
        const urlPath = pathPrefix.replace(/\.md$/, "");
        files.push(urlPath);
      }
    });

    return files;
  };

  const mdFiles = getAllMarkdownFiles(srcDir);
  const sitemapUrls = [
    { url: "", lastmod: new Date().toISOString() },
    ...mdFiles.map((file) => ({
      url: `/${file}`,
      lastmod: new Date().toISOString(),
    })),
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (item) => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(
    path.join(outputDir, "sitemap.xml"),
    sitemapContent,
    "utf-8",
  );
  console.log(
    `Sitemap generated: ${path.join(outputDir, "sitemap.xml")} with ${sitemapUrls.length} URLs`,
  );
}

// Vite plugin to serve sitemap.xml dynamically
function sitemapPlugin() {
  return {
    name: "sitemap-plugin",
    apply: "serve",
    configResolved(config) {
      const publicDir = path.join(process.cwd(), "src/public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      generateSitemap(publicDir);
      console.log("Sitemap plugin initialized for dev server");
    },
  };
}

function groupLabel(label, icon) {
  return `<span class="sb-group sb-icon--${icon}"><span class="sb-group__icon" aria-hidden="true"></span><span class="sb-group__label">${label}</span></span>`;
}

function featureLabel(label, feature) {
  return `<span class="sb-feature feature--${feature}"><span class="sb-feature__icon" aria-hidden="true"></span><span class="sb-feature__label">${label}</span></span>`;
}

const enSidebar =     [
      {
        text: groupLabel("Getting Started", "rocket"),
        collapsed: false,
        items: [
          { text: "Introduction", link: "/getting-started/introduction" },
          { text: "Admin Panel", link: "/getting-started/admin-panel" },
          { text: "Dashboard", link: "/getting-started/dashboard" },
          {
            text: "Store Setup Checklist",
            link: "/getting-started/store-setup-checklist",
          },
          { text: "Scheduled Tasks", link: "/getting-started/scheduled-tasks" },
          { text: "Command Palette", link: "/getting-started/command-palette" },
          {
            text: "Two-Factor Authentication",
            link: "/authentication/2fa-authentication",
          },
        ],
      },

      {
        text: groupLabel("Extensions & Plugins", "puzzle"),
        collapsed: false,
        items: [
          {
            text: "Point of Sale (POS)",
            link: "/plugins/pos",
          },
          {
            text: "Single Product Landing Pages",
            link: "/plugins/landing-pages",
          },
          {
            text: "Pre-Orders & Booking",
            link: "/plugins/preorder",
          },
          {
            text: "Purchases & Suppliers",
            link: "/plugins/purchases",
          },
          {
            text: "Delivery Time Slots",
            link: "/plugins/delivery-time-slots",
          },
          {
            text: "Interactive Size Charts",
            link: "/plugins/size-chart",
          },
          {
            text: "Order Confirmation & WhatsApp",
            link: "/plugins/order-confirm-whatsapp",
          },
          {
            text: "Marketing Pixels & Catalog",
            link: "/plugins/marketing-pixels",
          },
          {
            text: "Local Payments & Shipping",
            link: "/plugins/local-payments-shipping",
          },
          {
            text: "Back in Stock Notifications",
            link: "/plugins/back-in-stock",
          },
        ],
      },

      {
        text: featureLabel("Generative AI", "ai"),
        collapsed: false,
        items: [
          { text: "Overview", link: "/generative-ai/introduction" },
          {
            text: "Generate Text Content",
            link: "/generative-ai/generate-content",
          },
          {
            text: "Generate Product Images",
            link: "/generative-ai/generate-images",
          },
          { text: "AI Image Search", link: "/generative-ai/image-search" },
          {
            text: "Review Translation",
            link: "/generative-ai/review-translation",
          },
          {
            text: "Personalized Checkout Message",
            link: "/generative-ai/checkout-message",
          },
        ],
      },

      {
        text: featureLabel("Theme", "theme"),
        collapsed: false,
        items: [
          { text: "Themes & Sections", link: "/appearance/themes" },
          { text: "Section Types", link: "/appearance/section-types" },
        ],
      },

      {
        text: groupLabel("Store Setup", "settings"),
        collapsed: false,
        items: [
          { text: "Channels", link: "/settings/channels" },
          { text: "Locales", link: "/settings/locales" },
          { text: "Currencies", link: "/settings/currencies" },
          { text: "Exchange Rates", link: "/settings/exchange-rates" },
          { text: "Inventory Sources", link: "/settings/inventory-source" },
          { text: "Taxes", link: "/settings/taxes" },
          { text: "Users", link: "/settings/users" },
          { text: "Roles", link: "/settings/roles" },
          { text: "Data Transfer", link: "/settings/data-transfer" },
        ],
      },

      {
        text: groupLabel("Configure", "wrench"),
        collapsed: false,
        items: [
          { text: "Overview", link: "/configure/introduction" },
          {
            text: "General",
            collapsed: false,
            items: [
              { text: "General", link: "/configure/general" },
              { text: "Content", link: "/configure/content" },
              { text: "Design", link: "/configure/design" },
              {
                text: "Exchange Rates",
                link: "/configure/exchange-rates-configurations",
              },
              { text: "Sitemap", link: "/configure/sitemap" },
              { text: "GDPR", link: "/configure/gdpr" },
            ],
          },
          { text: "Generative AI (Magic AI)", link: "/configure/magic-ai" },
          {
            text: "Sales",
            collapsed: false,
            items: [
              { text: "Shipping Settings", link: "/configure/shipping" },
              {
                text: "Shipping Methods",
                link: "/shipping-method/shipping-methods",
              },
              { text: "Payment Methods", link: "/payment-method/payment-methods" },
              { text: "Checkout", link: "/configure/checkout" },
              { text: "Order Settings", link: "/configure/orders-settings" },
              { text: "Invoice Settings", link: "/configure/invoice-settings" },
              { text: "Taxes", link: "/configure/taxes" },
              { text: "RMA", link: "/configure/rma" },
              { text: "EU Withdrawals", link: "/configure/eu-withdrawals" },
            ],
          },
          {
            text: "Catalog",
            collapsed: false,
            items: [
              {
                text: "Products",
                collapsed: false,
                items: [
                  {
                    text: "Product Settings",
                    link: "/configure/configurable-choices",
                  },
                  { text: "Storefront", link: "/configure/frontend" },
                  {
                    text: "Product View Page",
                    link: "/configure/product-view-page",
                  },
                  { text: "Review", link: "/configure/review" },
                  { text: "Social Share", link: "/configure/social-share" },
                  { text: "Cart View Page", link: "/configure/cart-view-page" },
                  { text: "Attribute", link: "/configure/attribute" },
                  {
                    text: "Omnibus Price Disclosure",
                    link: "/configure/omnibus",
                  },
                ],
              },
              { text: "Inventory", link: "/configure/back-orders" },
              { text: "Rich Snippets", link: "/configure/rich-snippets" },
            ],
          },
          {
            text: "Customer",
            collapsed: false,
            items: [
              { text: "Customer Settings", link: "/configure/settings" },
              { text: "Address", link: "/configure/address" },
              { text: "Google Captcha", link: "/configure/google-captcha" },
            ],
          },
          {
            text: "Email",
            collapsed: false,
            items: [
              { text: "Email Settings", link: "/configure/email-settings" },
              { text: "Notifications", link: "/configure/notifications" },
            ],
          },
          { text: "Search Engines", link: "/configure/search-engines" },
          { text: "File Management", link: "/configure/file-management" },
          { text: "Cache Management", link: "/configure/cache-management" },
          { text: "About", link: "/configure/about" },
        ],
      },

      {
        text: groupLabel("Catalog", "package"),
        collapsed: false,
        items: [
          { text: "Categories", link: "/category/create-category" },
          {
            text: "Attributes",
            collapsed: false,
            items: [
              { text: "Attribute Input Types", link: "/attribute/attribute-input" },
              {
                text: "Product Attributes",
                link: "/attribute/product-attribute",
              },
              { text: "Attribute Families", link: "/attribute/attribute-family" },
            ],
          },
          {
            text: "Products",
            collapsed: false,
            items: [
              { text: "Products", link: "/product-types/products" },
              { text: "Simple Product", link: "/product-types/simple-product" },
              {
                text: "Configurable Product",
                link: "/product-types/configurable-product",
              },
              { text: "Virtual Product", link: "/product-types/virtual-product" },
              {
                text: "Downloadable Product",
                link: "/product-types/downloadable-product",
              },
              { text: "Grouped Product", link: "/product-types/grouped-product" },
              { text: "Bundle Product", link: "/product-types/bundle-product" },
              { text: "Booking Product", link: "/product-types/booking-product" },
            ],
          },
        ],
      },

      {
        text: groupLabel("Customers", "users"),
        collapsed: false,
        items: [
          { text: "Customers", link: "/customer/create-customer" },
          { text: "Customer Groups", link: "/customer/customer-group" },
          {
            text: "Customer Group Pricing",
            link: "/customer/customer-group-price",
          },
          { text: "Customer Reviews", link: "/customer/customer-review" },
          {
            text: "GDPR Data Requests",
            link: "/customer/gdpr-data-requests",
          },
          { text: "Customer Account", link: "/customer/customer-account" },
        ],
      },

      {
        text: groupLabel("Sales", "cart"),
        collapsed: false,
        items: [
          { text: "Orders", link: "/orders/orders" },
          { text: "Create Order", link: "/orders/create-order" },
          { text: "Create Invoice", link: "/orders/create-invoice" },
          { text: "Create Shipment", link: "/orders/create-shipment" },
          { text: "Create Refund", link: "/orders/create-refunds" },
          { text: "Transactions", link: "/orders/transactions" },
          { text: "Bookings", link: "/orders/bookings" },
          { text: "RMA", link: "/orders/rma" },
          { text: "EU Withdrawal", link: "/orders/eu-withdrawal" },
        ],
      },

      {
        text: groupLabel("Marketing", "megaphone"),
        collapsed: false,
        items: [
          { text: "Catalog Rules", link: "/marketing/catalog-rules" },
          { text: "Cart Rules", link: "/marketing/cart-rules" },
          { text: "Email Templates", link: "/marketing/email-templates" },
          { text: "Events", link: "/marketing/events" },
          { text: "Campaigns", link: "/marketing/campaigns" },
          {
            text: "Newsletter Subscriptions",
            link: "/marketing/newsletter-subscription",
          },
          { text: "URL Rewrites", link: "/marketing/url-rewrite" },
          { text: "Search Terms", link: "/marketing/search-terms" },
          { text: "Search Synonyms", link: "/marketing/search-synonyms" },
          { text: "Sitemaps", link: "/marketing/sitemaps" },
        ],
      },

      {
        text: groupLabel("CMS", "file"),
        collapsed: false,
        items: [{ text: "Pages", link: "/cms/create-cms" }],
      },

      {
        text: groupLabel("Reporting", "chart"),
        collapsed: false,
        items: [
          { text: "Sales", link: "/reporting/sales-report" },
          { text: "Customers", link: "/reporting/customers-report" },
          { text: "Products", link: "/reporting/product-report" },
        ],
      },

      {
        text: groupLabel("B2B Marketplace", "store"),
        collapsed: false,
        items: [
          { text: "Introduction", link: "/b2b-marketplace/introduction" },
          {
            text: "Request for Quotes",
            link: "/b2b-marketplace/request-for-quotes",
          },
          {
            text: "Buyer Seller Communication",
            link: "/b2b-marketplace/buyer-seller-communication",
          },
          {
            text: "Supplier Microsite",
            link: "/b2b-marketplace/supplier-microsite",
          },
          { text: "Buying leads", link: "/b2b-marketplace/buying-leads" },
          {
            text: "Review Management",
            link: "/b2b-marketplace/b2b-marketplace-review",
          },
        ],
      },

      {
        text: groupLabel("Multi Tenant Ecommerce", "cloud"),
        collapsed: false,
        items: [
          {
            text: "Introduction",
            link: "/multi-tenant-ecommerce/introduction",
          },
          {
            text: "Super Admin Management",
            link: "/multi-tenant-ecommerce/super-admin-management",
          },
          {
            text: "Tenant Management",
            link: "/multi-tenant-ecommerce/tenant-management",
          },
          {
            text: "CName Mapping",
            link: "/multi-tenant-ecommerce/cname-mapping",
          },
        ],
      },

      {
        text: groupLabel("B2B eCommerce Platform", "briefcase"),
        collapsed: false,
        items: [
          {
            text: "Introduction",
            link: "/b2b-ecommerce-platform/introduction",
          },
          {
            text: "Configuration",
            link: "/b2b-ecommerce-platform/configuration",
          },
          {
            text: "Company Registration",
            link: "/b2b-ecommerce-platform/company-registration",
          },
          {
            text: "Company Attributes",
            link: "/b2b-ecommerce-platform/company-attributes",
          },
          {
            text: "Role Based Permissions",
            link: "/b2b-ecommerce-platform/role-based-permissions",
          },
          {
            text: "Sales Representatives",
            link: "/b2b-ecommerce-platform/sales-representative",
          },
          {
            text: "Company Catalog",
            link: "/b2b-ecommerce-platform/company-catalog",
          },
          {
            text: "Company Credit",
            link: "/b2b-ecommerce-platform/company-credit",
          },
          {
            text: "Requisition Lists",
            link: "/b2b-ecommerce-platform/requisition-lists",
          },
          { text: "Quick Order", link: "/b2b-ecommerce-platform/quick-order" },
          {
            text: "Request for Quote",
            link: "/b2b-ecommerce-platform/request-for-quote",
          },
          {
            text: "Quotation Handling",
            link: "/b2b-ecommerce-platform/quotation-handling",
          },
          {
            text: "Purchase Orders",
            link: "/b2b-ecommerce-platform/purchase-orders",
          },
        ],
      },

      {
        text: groupLabel("Native Mobile App", "phone"),
        link: "/open-source-mobile-app/open-source-mobile-app",
      },
    ];

const arSidebar =     [
      {
        text: groupLabel("البداية السريعة", "rocket"),
        collapsed: false,
        items: [
          { text: "مقدمة", link: "/ar/getting-started/introduction" },
          { text: "لوحة التحكم", link: "/ar/getting-started/admin-panel" },
          { text: "الرئيسية والإحصائيات", link: "/ar/getting-started/dashboard" },
          {
            text: "قائمة إعداد المتجر",
            link: "/ar/getting-started/store-setup-checklist",
          },
          { text: "المهام المجدولة", link: "/ar/getting-started/scheduled-tasks" },
          { text: "شريط الأوامر السريعة", link: "/ar/getting-started/command-palette" },
          {
            text: "المصادقة الثنائية (2FA)",
            link: "/ar/authentication/2fa-authentication",
          },
        ],
      },

      {
        text: groupLabel("الإضافات والأنظمة المتقدمة", "puzzle"),
        collapsed: false,
        items: [
          {
            text: "نظام نقاط البيع والكاشير (POS)",
            link: "/ar/plugins/pos",
          },
          {
            text: "صفحات الهبوط المخصصة (Landing Pages)",
            link: "/ar/plugins/landing-pages",
          },
          {
            text: "الحجز والطلب المسبق (Pre-Orders)",
            link: "/ar/plugins/preorder",
          },
          {
            text: "المشتريات وإدارة الموردين",
            link: "/ar/plugins/purchases",
          },
          {
            text: "مواعيد وفتحات التوصيل (Time Slots)",
            link: "/ar/plugins/delivery-time-slots",
          },
          {
            text: "دليل وجداول المقاسات (Size Charts)",
            link: "/ar/plugins/size-chart",
          },
          {
            text: "تأكيد الطلبات ورسائل الواتساب",
            link: "/ar/plugins/order-confirm-whatsapp",
          },
          {
            text: "بكسلات التتبع وكتالوج ميتا",
            link: "/ar/plugins/marketing-pixels",
          },
          {
            text: "بوابات الدفع والشحن المحلية",
            link: "/ar/plugins/local-payments-shipping",
          },
          {
            text: "تنبيهات توفر المخزون (Back in Stock)",
            link: "/ar/plugins/back-in-stock",
          },
        ],
      },

      {
        text: featureLabel("الذكاء الاصطناعي (Magic AI)", "ai"),
        collapsed: false,
        items: [
          { text: "نظرة عامة", link: "/ar/generative-ai/introduction" },
          {
            text: "توليد المحتوى والنصوص",
            link: "/ar/generative-ai/generate-content",
          },
          {
            text: "توليد صور المنتجات",
            link: "/ar/generative-ai/generate-images",
          },
          { text: "البحث بالصور", link: "/ar/generative-ai/image-search" },
          {
            text: "ترجمة المراجعات والتقييمات",
            link: "/ar/generative-ai/review-translation",
          },
          {
            text: "رسالة إتمام الطلب المخصصة",
            link: "/ar/generative-ai/checkout-message",
          },
        ],
      },

      {
        text: featureLabel("المظهر والقوالب", "theme"),
        collapsed: false,
        items: [
          { text: "القوالب والأقسام", link: "/ar/appearance/themes" },
          { text: "أنواع الأقسام", link: "/ar/appearance/section-types" },
        ],
      },

      {
        text: groupLabel("إعداد المتجر", "settings"),
        collapsed: false,
        items: [
          { text: "القنوات (المتاجر)", link: "/ar/settings/channels" },
          { text: "اللغات", link: "/ar/settings/locales" },
          { text: "العملات", link: "/ar/settings/currencies" },
          { text: "أسعار الصرف", link: "/ar/settings/exchange-rates" },
          { text: "مصادر المخزون والفروع", link: "/ar/settings/inventory-source" },
          { text: "الضرائب", link: "/ar/settings/taxes" },
          { text: "المستخدمون والمدراء", link: "/ar/settings/users" },
          { text: "الأدوار والصلاحيات", link: "/ar/settings/roles" },
          { text: "استيراد وتصدير البيانات", link: "/ar/settings/data-transfer" },
        ],
      },

      {
        text: groupLabel("الإعدادات العامة", "wrench"),
        collapsed: false,
        items: [
          { text: "نظرة عامة", link: "/ar/configure/introduction" },
          {
            text: "عام",
            collapsed: false,
            items: [
              { text: "عام", link: "/ar/configure/general" },
              { text: "المحتوى", link: "/ar/configure/content" },
              { text: "التصميم", link: "/ar/configure/design" },
              {
                text: "أسعار الصرف",
                link: "/ar/configure/exchange-rates-configurations",
              },
              { text: "خريطة الموقع", link: "/ar/configure/sitemap" },
              { text: "الخصوصية (GDPR)", link: "/ar/configure/gdpr" },
            ],
          },
          { text: "الذكاء الاصطناعي (Magic AI)", link: "/ar/configure/magic-ai" },
          {
            text: "تقارير المبيعات",
            collapsed: false,
            items: [
              { text: "إعدادات الشحن", link: "/ar/configure/shipping" },
              {
                text: "طرق الشحن",
                link: "/ar/shipping-method/shipping-methods",
              },
              { text: "طرق الدفع", link: "/ar/payment-method/payment-methods" },
              { text: "إتمام الطلب", link: "/ar/configure/checkout" },
              { text: "إعدادات الطلبات", link: "/ar/configure/orders-settings" },
              { text: "إعدادات الفواتير", link: "/ar/configure/invoice-settings" },
              { text: "الضرائب", link: "/ar/configure/taxes" },
              { text: "طلبات الإرجاع (RMA)", link: "/ar/configure/rma" },
              { text: "حق الانسحاب الأوروبي", link: "/ar/configure/eu-withdrawals" },
            ],
          },
          {
            text: "Catalog",
            collapsed: false,
            items: [
              {
                text: "المنتجات",
                collapsed: false,
                items: [
                  {
                    text: "إعدادات المنتجات",
                    link: "/ar/configure/configurable-choices",
                  },
                  { text: "واجهة المتجر", link: "/ar/configure/frontend" },
                  {
                    text: "صفحة عرض المنتج",
                    link: "/ar/configure/product-view-page",
                  },
                  { text: "التقييمات", link: "/ar/configure/review" },
                  { text: "المشاركة الاجتماعية", link: "/ar/configure/social-share" },
                  { text: "صفحة سلة الشراء", link: "/ar/configure/cart-view-page" },
                  { text: "السمات", link: "/ar/configure/attribute" },
                  {
                    text: "الإفصاح عن الأسعار (Omnibus)",
                    link: "/ar/configure/omnibus",
                  },
                ],
              },
              { text: "المخزون والطلبات المسبقة", link: "/ar/configure/back-orders" },
              { text: "بيانات مقتطفات محركات البحث", link: "/ar/configure/rich-snippets" },
            ],
          },
          {
            text: "Customer",
            collapsed: false,
            items: [
              { text: "إعدادات العملاء", link: "/ar/configure/settings" },
              { text: "العناوين", link: "/ar/configure/address" },
              { text: "كابتشا جوجل", link: "/ar/configure/google-captcha" },
            ],
          },
          {
            text: "Email",
            collapsed: false,
            items: [
              { text: "إعدادات البريد الإلكتروني", link: "/ar/configure/email-settings" },
              { text: "الإشعارات", link: "/ar/configure/notifications" },
            ],
          },
          { text: "محركات البحث", link: "/ar/configure/search-engines" },
          { text: "إدارة الملفات", link: "/ar/configure/file-management" },
          { text: "إدارة الذاكرة المؤقتة (Cache)", link: "/ar/configure/cache-management" },
          { text: "حول النظام", link: "/ar/configure/about" },
        ],
      },

      {
        text: groupLabel("الكتالوج", "package"),
        collapsed: false,
        items: [
          { text: "التصنيفات", link: "/ar/category/create-category" },
          {
            text: "السمات",
            collapsed: false,
            items: [
              { text: "أنواع إدخال السمات", link: "/ar/attribute/attribute-input" },
              {
                text: "سمات المنتجات",
                link: "/ar/attribute/product-attribute",
              },
              { text: "أسر السمات", link: "/ar/attribute/attribute-family" },
            ],
          },
          {
            text: "المنتجات",
            collapsed: false,
            items: [
              { text: "المنتجات", link: "/ar/product-types/products" },
              { text: "منتج بسيط (Simple)", link: "/ar/product-types/simple-product" },
              {
                text: "منتج متعدد الخيارات (Configurable)",
                link: "/ar/product-types/configurable-product",
              },
              { text: "منتج افتراضي (Virtual)", link: "/ar/product-types/virtual-product" },
              {
                text: "منتج قابل للتنزيل (Downloadable)",
                link: "/ar/product-types/downloadable-product",
              },
              { text: "منتج مجمع (Grouped)", link: "/ar/product-types/grouped-product" },
              { text: "منتج حزمة (Bundle)", link: "/ar/product-types/bundle-product" },
              { text: "منتج حجز وخدمات (Booking)", link: "/ar/product-types/booking-product" },
            ],
          },
        ],
      },

      {
        text: groupLabel("العملاء", "users"),
        collapsed: false,
        items: [
          { text: "تقارير العملاء", link: "/ar/customer/create-customer" },
          { text: "مجموعات العملاء", link: "/ar/customer/customer-group" },
          {
            text: "أسعار مجموعات العملاء",
            link: "/ar/customer/customer-group-price",
          },
          { text: "تقييمات العملاء", link: "/ar/customer/customer-review" },
          {
            text: "طلبات بيانات الخصوصية (GDPR)",
            link: "/ar/customer/gdpr-data-requests",
          },
          { text: "حساب العميل في المتجر", link: "/ar/customer/customer-account" },
        ],
      },

      {
        text: groupLabel("المبيعات", "cart"),
        collapsed: false,
        items: [
          { text: "الطلبات", link: "/ar/orders/orders" },
          { text: "إنشاء طلب جديد", link: "/ar/orders/create-order" },
          { text: "إصدار فاتورة", link: "/ar/orders/create-invoice" },
          { text: "إنشاء شحنة", link: "/ar/orders/create-shipment" },
          { text: "إصدار استرداد أموال", link: "/ar/orders/create-refunds" },
          { text: "المعاملات المالية", link: "/ar/orders/transactions" },
          { text: "الحجوزات", link: "/ar/orders/bookings" },
          { text: "طلبات الإرجاع (RMA)", link: "/ar/orders/rma" },
          { text: "حق الانسحاب الأوروبي", link: "/ar/orders/eu-withdrawal" },
        ],
      },

      {
        text: groupLabel("التسويق", "megaphone"),
        collapsed: false,
        items: [
          { text: "قواعد أسعار الكتالوج", link: "/ar/marketing/catalog-rules" },
          { text: "قواعد سلة الشراء والكوبونات", link: "/ar/marketing/cart-rules" },
          { text: "قوالب البريد الإلكتروني", link: "/ar/marketing/email-templates" },
          { text: "الأحداث والمناسبات", link: "/ar/marketing/events" },
          { text: "الحملات التسويقية", link: "/ar/marketing/campaigns" },
          {
            text: "اشتراكات النشرة البريدية",
            link: "/ar/marketing/newsletter-subscription",
          },
          { text: "إعادة توجيه الروابط (URL Rewrites)", link: "/ar/marketing/url-rewrite" },
          { text: "كلمات البحث الشائعة", link: "/ar/marketing/search-terms" },
          { text: "مرادفات البحث", link: "/ar/marketing/search-synonyms" },
          { text: "خرائط الموقع", link: "/ar/marketing/sitemaps" },
        ],
      },

      {
        text: groupLabel("إدارة المحتوى (CMS)", "file"),
        collapsed: false,
        items: [{ text: "صفحات الموقع", link: "/ar/cms/create-cms" }],
      },

      {
        text: groupLabel("التقارير", "chart"),
        collapsed: false,
        items: [
          { text: "تقارير المبيعات", link: "/ar/reporting/sales-report" },
          { text: "تقارير العملاء", link: "/ar/reporting/customers-report" },
          { text: "المنتجات", link: "/ar/reporting/product-report" },
        ],
      },

      {
        text: groupLabel("سوق الشركات (B2B Marketplace)", "store"),
        collapsed: false,
        items: [
          { text: "مقدمة", link: "/ar/b2b-marketplace/introduction" },
          {
            text: "طلبات عروض الأسعار (RFQ)",
            link: "/ar/b2b-marketplace/request-for-quotes",
          },
          {
            text: "التواصل بين المشتري والبائع",
            link: "/ar/b2b-marketplace/buyer-seller-communication",
          },
          {
            text: "صفحة المورد الخاصة",
            link: "/ar/b2b-marketplace/supplier-microsite",
          },
          { text: "فرص الشراء والشراء المباشر", link: "/ar/b2b-marketplace/buying-leads" },
          {
            text: "إدارة التقييمات",
            link: "/ar/b2b-marketplace/b2b-marketplace-review",
          },
        ],
      },

      {
        text: groupLabel("المتاجر المتعددة (Multi-Tenant SaaS)", "cloud"),
        collapsed: false,
        items: [
          {
            text: "مقدمة",
            link: "/ar/multi-tenant-ecommerce/introduction",
          },
          {
            text: "إدارة السوبر أدمن",
            link: "/ar/multi-tenant-ecommerce/super-admin-management",
          },
          {
            text: "إدارة المتاجر والمستأجرين",
            link: "/ar/multi-tenant-ecommerce/tenant-management",
          },
          {
            text: "ربط النطاقات الخاصة (CNAME)",
            link: "/ar/multi-tenant-ecommerce/cname-mapping",
          },
        ],
      },

      {
        text: groupLabel("منصة تجارة الشركات (B2B Suite)", "briefcase"),
        collapsed: false,
        items: [
          {
            text: "مقدمة",
            link: "/ar/b2b-ecommerce-platform/introduction",
          },
          {
            text: "الإعدادات",
            link: "/ar/b2b-ecommerce-platform/configuration",
          },
          {
            text: "تسجيل الشركات",
            link: "/ar/b2b-ecommerce-platform/company-registration",
          },
          {
            text: "سمات الشركات",
            link: "/ar/b2b-ecommerce-platform/company-attributes",
          },
          {
            text: "صلاحيات وأدوار الموظفين",
            link: "/ar/b2b-ecommerce-platform/role-based-permissions",
          },
          {
            text: "ممثلو المبيعات",
            link: "/ar/b2b-ecommerce-platform/sales-representative",
          },
          {
            text: "كتالوج الشركات المخصص",
            link: "/ar/b2b-ecommerce-platform/company-catalog",
          },
          {
            text: "الائتمان وتسهيلات الدفع",
            link: "/ar/b2b-ecommerce-platform/company-credit",
          },
          {
            text: "قوائم الطلب المسبق",
            link: "/ar/b2b-ecommerce-platform/requisition-lists",
          },
          { text: "الطلب السريع بالأكواد", link: "/ar/b2b-ecommerce-platform/quick-order" },
          {
            text: "طلب عرض سعر",
            link: "/ar/b2b-ecommerce-platform/request-for-quote",
          },
          {
            text: "إدارة عروض الأسعار والتفاوض",
            link: "/ar/b2b-ecommerce-platform/quotation-handling",
          },
          {
            text: "أوامر الشراء (PO)",
            link: "/ar/b2b-ecommerce-platform/purchase-orders",
          },
        ],
      },

      {
        text: groupLabel("تطبيقات الهاتف الذكي", "phone"),
        link: "/ar/open-source-mobile-app/open-source-mobile-app",
      },
    ];

export default defineConfig({
  srcDir: "./src",

  locales: {
    root: {
      label: "English",
      lang: "en-US",
      title: "Bagisto User Documentation",
      description: "Bagisto User Documentation",
      themeConfig: {
        nav: [
          { text: "Point of Sale (POS)", link: "/plugins/pos" },
          {
            text: "Extensions & Systems",
            items: [
              { text: "Point of Sale (POS)", link: "/plugins/pos" },
              { text: "Single Product Landing Pages", link: "/plugins/landing-pages" },
              { text: "Purchases & Suppliers", link: "/plugins/purchases" },
              { text: "Pre-Orders & Booking", link: "/plugins/preorder" },
              { text: "Delivery Time Slots", link: "/plugins/delivery-time-slots" },
              { text: "Interactive Size Charts", link: "/plugins/size-chart" },
              { text: "Order Confirmation & WhatsApp", link: "/plugins/order-confirm-whatsapp" },
              { text: "Marketing Pixels & Catalog", link: "/plugins/marketing-pixels" },
              { text: "Local Payments & Shipping", link: "/plugins/local-payments-shipping" },
              { text: "Back in Stock Notifications", link: "/plugins/back-in-stock" },
            ],
          },
          { text: "Dev Docs", link: "https://devdocs.bagisto.com/" },
          { text: "Community Forum", link: "https://forums.bagisto.com/" },
          { text: "Contact Us", link: "https://bagisto.com/en/contacts/" },
        ],
        editLink: {
          pattern: "https://github.com/AhmedNabil1992/bagisto-user-guide/edit/master/src/:path",
          text: "Help us improve this page on Github.",
        },
        lastUpdated: {
          text: "Last Updated",
          formatOptions: {
            dateStyle: "full",
          },
        },
        sidebar: enSidebar,
      },
    },
    ar: {
      label: "العربية",
      lang: "ar-SA",
      dir: "rtl",
      link: "/ar/",
      title: "دليل مستخدم باجيستو",
      description: "دليل مستخدم منصة باجيستو للتجارة الإلكترونية",
      themeConfig: {
        nav: [
          { text: "نظام نقاط البيع والكاشير (POS)", link: "/ar/plugins/pos" },
          {
            text: "الأنظمة والإضافات المتقدمة",
            items: [
              { text: "نظام نقاط البيع والكاشير (POS)", link: "/ar/plugins/pos" },
              { text: "صفحات الهبوط المخصصة (Funnels)", link: "/ar/plugins/landing-pages" },
              { text: "المشتريات وإدارة الموردين", link: "/ar/plugins/purchases" },
              { text: "الحجز والطلب المسبق (Pre-Orders)", link: "/ar/plugins/preorder" },
              { text: "مواعيد وفتحات التوصيل (Time Slots)", link: "/ar/plugins/delivery-time-slots" },
              { text: "دليل وجداول المقاسات (Size Chart)", link: "/ar/plugins/size-chart" },
              { text: "تأكيد الطلبات ورسائل الواتساب", link: "/ar/plugins/order-confirm-whatsapp" },
              { text: "بكسلات التتبع وكتالوج ميتا", link: "/ar/plugins/marketing-pixels" },
              { text: "بوابات الدفع والشحن المحلية", link: "/ar/plugins/local-payments-shipping" },
              { text: "تنبيهات توفر المخزون (Back in Stock)", link: "/ar/plugins/back-in-stock" },
            ],
          },
          { text: "توثيق المطورين", link: "https://devdocs.bagisto.com/" },
          { text: "المنتدى", link: "https://forums.bagisto.com/" },
          { text: "اتصل بنا", link: "https://bagisto.com/en/contacts/" },
        ],
        editLink: {
          pattern: "https://github.com/AhmedNabil1992/bagisto-user-guide/edit/master/src/:path",
          text: "ساعدنا في تحسين هذه الصفحة على Github.",
        },
        lastUpdated: {
          text: "آخر تحديث",
          formatOptions: {
            dateStyle: "full",
          },
        },
        docFooter: {
          prev: "الصفحة السابقة",
          next: "الصفحة التالية",
        },
        outline: {
          label: "محتويات الصفحة",
        },
        returnToTopLabel: "العودة إلى الأعلى",
        sidebarMenuLabel: "القائمة",
        darkModeSwitchLabel: "المظهر",
        lightModeSwitchTitle: "التبديل إلى الوضع الفاتح",
        darkModeSwitchTitle: "التبديل إلى الوضع الداكن",
        sidebar: arSidebar,
      },
    },
  },

  vite: {
    server: {
      host: "0.0.0.0",
    },
    plugins: [sitemapPlugin()],
  },

  head: [
    [
      "meta",
      {
        name: "google-site-verification",
        content: "elxsIWt5ea-SmaO99B5RD3z_35WCl-hLJejTZEfVu4I",
      },
    ],
    ["link", { rel: "icon", type: "image/png", href: "/favicon.ico" }],
    [
      "script",
      {},
      `window.chatbotConfig = { url: "https://ask.bagisto.com:5000/chat" };`,
    ],
    [
      "script",
      {
        src: "https://bagisto.github.io/ai-chatbot/chatbot.js",
        async: true,
      },
    ],
  ],

  themeConfig: {
    siteTitle: false,

    logo: {
      light: "/logo.png",
      dark: "/logo.png",
    },

    outline: {
      level: "deep",
    },

    footer: {
      message:
        'Released under the <a href="https://opensource.org/licenses/mit" target="_blank" class="mit-license">MIT License</a>.',
      copyright: `Copyright © ${new Date().getFullYear()} Webkul`,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/bagisto/bagisto" },
    ],

    search: {
      provider: "local",
      options: {
        locales: {
          ar: {
            translations: {
              button: {
                buttonText: "بحث في الدليل",
                buttonAriaLabel: "بحث في الدليل",
              },
              modal: {
                displayDetails: "عرض التفاصيل",
                resetButtonTitle: "إعادة ضبط البحث",
                backButtonTitle: "إغلاق البحث",
                noResultsText: "لا توجد نتائج مطابقة لـ",
                footer: {
                  selectText: "للاختيار",
                  selectKeyAriaLabel: "إدخال",
                  navigateText: "للتنقل",
                  navigateUpKeyAriaLabel: "سهم لأعلى",
                  navigateDownKeyAriaLabel: "سهم لأسفل",
                  closeText: "للإغلاق",
                  closeKeyAriaLabel: "هروب",
                },
              },
            },
          },
        },
      },
    },
  },

  buildEnd(siteConfig) {
    const outDir = siteConfig.outDir;

    // Generate sitemap
    generateSitemap(outDir);

    Object.entries(redirects).forEach(([from, to]) => {
      if (from.includes("*")) {
        console.warn(`⚠️ Skipping wildcard redirect: ${from} -> ${to}`);
        return;
      }

      let filePath;

      if (from.endsWith(".html")) {
        filePath = path.join(outDir, from);
      } else {
        filePath = path.join(outDir, from, "index.html");
      }

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, makeRedirectHtml(to), "utf-8");
      console.log(`✅ Redirect created: ${from} -> ${to}`);
    });
  },

  configResolved(config) {
    const publicDir = path.join(process.cwd(), "src/public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    generateSitemap(publicDir);
  },
});
