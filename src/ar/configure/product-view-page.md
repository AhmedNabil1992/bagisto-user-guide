# صفحة عرض المنتج (Product View Page)

يحدد قسم **تكوين صفحة عرض المنتج (Product view page configuration)** عدد المنتجات ذات الصلة (Related Products) والمنتجات الترويجية البديلة (Up-Sell Products) التي تظهر في صفحة تفاصيل المنتج، وما إذا كان بإمكان المتسوقين شراء المنتج فوراً والتنقل مباشرة للدفع. تُطبق هذه الإعدادات على مستوى المتجر بأكمله.

1. انتقل إلى **التكوين >> الكتالوج >> المنتجات (Configure >> Catalog >> Products)**.
2. في قسم **تكوين صفحة عرض المنتج (Product view page configuration)**، أدخل **عدد المنتجات ذات الصلة المسموح به (Allowed number of Related Products)**.
3. أدخل **عدد المنتجات البديلة المسموح به (Allowed number of Up-Sell Products)**.
4. قم بتفعيل أو تعطيل خيار **السماح للعملاء بشراء المنتجات مباشرة (Allow customers to directly buy products)**.
5. انقر على **حفظ التكوين (Save Configuration)**.

<ImagePopup src="/images/configure/products-product-view-page.png" alt="قسم تكوين صفحة عرض المنتج في شاشة المنتجات" />

**عدد المنتجات ذات الصلة المسموح به (Allowed number of Related Products):** عدد المنتجات ذات الصلة المحددة على المنتج والتي سيتم عرضها في صفحته. اتركه فارغاً لعرضها جميعاً، أو أدخل `0` لعدم عرض أي منها.

**عدد المنتجات البديلة المسموح به (Allowed number of Up-Sell Products):** عدد المنتجات البديلة (Up-Sell) المحددة على المنتج والتي سيتم عرضها للمتسوقين. اتركه فارغاً لعرضها جميعاً، أو أدخل `0` لإخفائها.

يتم اختيار المنتجات ذات الصلة والبديلة لكل منتج على حدة؛ راجع [المنتجات](../product-types/products.md#related-up-sell-and-cross-sell-products).

**السماح للعملاء بشراء المنتجات مباشرة (Allow customers to directly buy products):** يظهر زر **اشترِ الآن (Buy Now)** بجانب زر **أضف إلى السلة (Add To Cart)** في صفحة المنتج. عند النقر عليه، ينتقل المتسوق مباشرة إلى مرحلة إتمام الطلب والدفع متخطياً خطوات السلة المعتادة. لا يظهر هذا الزر في حال تم تعطيل **صفحة السلة (Cart Page)** تحت قسم [إتمام الطلب](./checkout.md).

## الفروقات في إصدار Bagisto 2.4

في إصدار Bagisto 2.4، يقع خيار **السماح للعملاء بشراء المنتجات مباشرة (Allow customers to directly buy products)** في قسم [واجهة المتجر (Storefront)](./frontend.md).
