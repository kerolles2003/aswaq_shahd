const products = [
    {
        id: 1,
        name: "جهينة حليب كامل / خالي الدسم 1 لتر",
        desc: "حليب طبيعي 100% عالي الجودة",
        price: 44.95,
        oldPrice: 49.00,
        category: "drinks",
        image: "assets/img/juhayna_milk.png",
        offer: true
    },
    {
        id: 2,
        name: "بخيرة حليب 1 لتر",
        desc: "حليب صحي ومغذي",
        price: 36.95,
        oldPrice: 40.00,
        category: "drinks",
        image: "assets/img/bekhero_milk.png",
        offer: true
    },
    {
        id: 3,
        name: "جهينة عصير 1 لتر متنوع",
        desc: "نكهات متنوعة (جوافة، مانجو، كوكتيل)",
        price: 29.95,
        oldPrice: 35.00,
        category: "drinks",
        image: "assets/img/juhayna_juice.png",
        offer: true
    },
    {
        id: 4,
        name: "جهينة عصير بيور 1 لتر متنوع",
        desc: "عصير طبيعي بدون سكر مضاف",
        price: 54.95,
        oldPrice: 59.50,
        category: "drinks",
        image: "assets/img/juhayna_juice.png",
        offer: true
    },
    {
        id: 5,
        name: "جهينة عصير 235 مل عرض 4 متنوع",
        desc: "عرض خاص 4 عبوات - مثالي للمدرسة",
        price: 30.95,
        oldPrice: 36.00,
        category: "drinks",
        image: "assets/img/juhayna_juice.png",
        offer: true
    },
    {
        id: 6,
        name: "جهينة حليب ميكس 200 مل عرض 30 قطعة",
        desc: "حليب بالنكهات للأطفال - كرتونة توفير",
        price: 30.95,
        oldPrice: 52.00,
        category: "drinks",
        image: "assets/img/juhayna_milk.png",
        offer: true
    },
    {
        id: 7,
        name: "جهينة زبادي طبيعي / فراولة 105 جم عرض 1+4",
        desc: "طعم طازج وقوام كريمي",
        price: 45.95,
        oldPrice: 90.00,
        category: "food",
        image: "assets/img/juhayna_yogurt.png",
        offer: true
    },
    {
        id: 8,
        name: "جهينة زبادي طبيعي 1 كجم",
        desc: "عبوة عائلية موفرة",
        price: 78.95,
        oldPrice: null,
        category: "food",
        image: "assets/img/juhayna_yogurt.png",
        offer: false
    },
    {
        id: 9,
        name: "جهينة زبادي طبيعي 475 جم",
        desc: "حجم متوسط مثالي",
        price: 35.95,
        oldPrice: 42.00,
        category: "food",
        image: "assets/img/juhayna_yogurt.png",
        offer: true
    },
    {
        id: 10,
        name: "جهينة زبادي 220 مل اطعم",
        desc: "زبادي للشرب منعش ومفيد",
        price: 14.95,
        oldPrice: 17.00,
        category: "drinks",
        image: "assets/img/juhayna_yogurt.png",
        offer: true
    },
    {
        id: 11,
        name: "جهينة كريمة طهي / خفق 200 مل",
        desc: "لأشهى الأطباق والحلويات",
        price: 52.95,
        oldPrice: 65.00,
        category: "food",
        image: "assets/img/juhayna_cream.png",
        offer: true
    },
];

// Categories map helper
const categoryNames = {
    food: "مواد غذائية",
    drinks: "مشروبات",
    clean: "منظفات",
    fresh: "خضار وفواكه"
};

const catalogPages = [
    "assets/img/1.jpg",
    "assets/img/ramadan/2.jpg",
    "assets/img/ramadan/3.jpg",
    "assets/img/ramadan/4.jpg",
    "assets/img/ramadan/5.jpg",
    "assets/img/ramadan/6.jpg",
    "assets/img/ramadan/7.jpg",
    "assets/img/ramadan/8.jpg",
    "assets/img/ramadan/9.jpg",
    "assets/img/ramadan/10.jpg",
    "assets/img/ramadan/11.jpg",
    "assets/img/ramadan/12.jpg",
    "assets/img/ramadan/13.jpg",
    "assets/img/ramadan/14.jpg",
    "assets/img/ramadan/15.jpg",
    "assets/img/ramadan/16.jpg",
    "assets/img/ramadan/17.jpg",
    "assets/img/ramadan/18.jpg",
    "assets/img/ramadan/19.jpg",
    "assets/img/ramadan/20.jpg",
    "assets/img/ramadan/21.jpg",
    "assets/img/ramadan/22.jpg",
    "assets/img/ramadan/23.jpg",
    "assets/img/ramadan/24.jpg",
    "assets/img/ramadan/25.jpg",
    "assets/img/ramadan/26.jpg",
    "assets/img/ramadan/27.jpg",
    "assets/img/ramadan/28.jpg",
    "assets/img/ramadan/29.jpg",
    "assets/img/ramadan/30.jpg",
    "assets/img/ramadan/31.jpg",
    "assets/img/ramadan/32.jpg",
    "assets/img/ramadan/33.jpg",
    "assets/img/ramadan/34.jpg",
    "assets/img/ramadan/35.jpg",
    "assets/img/ramadan/36.jpg",
    "assets/img/ramadan/37.jpg",
    "assets/img/ramadan/38.jpg",
    "assets/img/ramadan/39.jpg",
    "assets/img/40.jpg",
    "assets/img/41.jpg",
    "assets/img/42.jpg",
    "assets/img/43.jpg",
    "assets/img/44.jpg"
];
