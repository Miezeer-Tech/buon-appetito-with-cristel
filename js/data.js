/**
 * Editable content for the Cooking With Cristel preview site.
 *
 * HOW TO UPDATE
 * - Real recipes and looks will replace the objects below.
 * - Keep `placeholder: true` until a recipe or look is confirmed and ready.
 * - Fashion "Shop the look" buttons use href: "#" and affiliate: "placeholder-..."
 *   until a brand partnership is live. Then set href to the affiliate URL
 *   and a stable affiliate id.
 * - Do not invent biographical facts. About copy is drawn from the official
 *   Cristel Monrose brand guidelines (November 2026).
 */
window.CRISTEL_DATA = {
  recipes: [
    {
      id: "sample-herb-pasta",
      title: "Herb pasta at the table",
      titlePrefix: "Sample dish",
      time: "30 min",
      timeNote: "sample time",
      section: "showcase",
      diet: "Sample layout",
      image: "assets/images/dish-herb-pasta.webp",
      imageAlt: "Sample stock photo: three plates of herb pasta and glasses of red wine on a white tablecloth. Not a photo from the show.",
      excerpt: "Recipe coming soon — sample layout. Replace this card with one of Cristel’s pasta recipes.",
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    },
    {
      id: "sample-rosemary-pizza",
      title: "Rosemary pizza al taglio",
      titlePrefix: "Sample dish",
      time: "40 min",
      timeNote: "sample time",
      section: "showcase",
      diet: "Sample layout",
      image: "assets/images/dish-rosemary-pizza.webp",
      imageAlt: "Sample stock photo: a sliced cheese pizza with rosemary and cherry tomatoes on a wooden board. Not a photo from the show.",
      excerpt: "Recipe coming soon — sample layout. A placeholder for a pizza or focaccia from the show.",
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    },
    {
      id: "sample-berry-tarts",
      title: "Berry lattice tarts",
      titlePrefix: "Sample dish",
      time: "55 min",
      timeNote: "sample time",
      section: "showcase",
      diet: "Sample layout",
      image: "assets/images/dish-berry-tarts.webp",
      imageAlt: "Sample stock photo: two small berry pies with lattice crusts, berries, and a teapot on a white table. Not a photo from the show.",
      excerpt: "Recipe coming soon — sample layout. A placeholder for a dessert to close the meal.",
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    },
    {
      id: "sample-tomato-toast",
      title: "Tomato and ricotta toast",
      titlePrefix: "Sample dish",
      time: "10 min",
      timeNote: "sample time",
      section: "quick",
      diet: "Vegetarian · sample",
      image: "assets/images/dish-tomato-toast.webp",
      imageAlt: "Sample stock photo: toasted bread with ricotta and chopped tomatoes on a wooden board beside a bottle of olive oil. Not a photo from the show.",
      excerpt: "Recipe coming soon — sample layout for a 10-minutes-or-less dish.",
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    },
    {
      id: "sample-garden-salad",
      title: "Chopped garden salad",
      titlePrefix: "Sample dish",
      time: "10 min",
      timeNote: "sample time",
      section: "quick",
      diet: "Vegan · sample",
      image: "assets/images/dish-garden-salad.webp",
      imageAlt: "Sample stock photo: a chopped salad with tomatoes, cucumber, radish, avocado, and greens. Not a photo from the show.",
      excerpt: "Recipe coming soon — sample layout for a 10-minutes-or-less dish.",
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    },
    {
      id: "sample-tomato-rotini",
      title: "Cherry tomato rotini",
      titlePrefix: "Sample dish",
      time: "10 min",
      timeNote: "sample time",
      section: "quick",
      diet: "Meatless · sample",
      image: "assets/images/dish-tomato-rotini.webp",
      imageAlt: "Sample stock photo: a bowl of rotini pasta with cherry tomatoes and basil. Not a photo from the show.",
      excerpt: "Recipe coming soon — sample layout for a 10-minutes-or-less dish.",
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    },
    {
      id: "sample-market-bowl",
      title: "Market vegetable bowl",
      titlePrefix: "Sample dish",
      time: "20 min",
      timeNote: "sample time",
      section: "vegan",
      diet: "Vegan · sample",
      image: "assets/images/dish-market-bowl.webp",
      imageAlt: "Sample stock photo: a bowl of avocado, chickpeas, sweet potato, tomatoes, and greens. Not a photo from the show.",
      excerpt: "Recipe coming soon — sample layout for a vegan dish.",
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    },
    {
      id: "sample-garden-vegan",
      title: "Everyday green salad",
      titlePrefix: "Sample dish",
      time: "10 min",
      timeNote: "sample time",
      section: "vegan",
      diet: "Vegan · sample",
      image: "assets/images/dish-garden-salad.webp",
      imageAlt: "Sample stock photo: a colorful chopped salad with avocado and fresh vegetables. Not a photo from the show.",
      excerpt: "Recipe coming soon — sample layout for a vegan, no-meat option.",
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    },
    {
      id: "sample-rotini-meatless",
      title: "Tomato basil rotini",
      titlePrefix: "Sample dish",
      time: "20 min",
      timeNote: "sample time",
      section: "vegan",
      diet: "Meatless · sample",
      image: "assets/images/dish-tomato-rotini.webp",
      imageAlt: "Sample stock photo: rotini with tomatoes and basil on a white wooden table. Not a photo from the show.",
      excerpt: "Recipe coming soon — sample layout for a meatless pasta.",
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    }
  ],
  looks: [
    {
      id: "sample-studio-heels",
      title: "Studio heels",
      titlePrefix: "Sample look",
      image: "assets/images/look-heels.jpg",
      imageAlt: "Sample stock photo: a pair of cream pointed heels by a window. Not a photo of an outfit from the show.",
      note: "Placeholder for an accessory or outfit from Buon Appetito with Cristel. Replace with the real look, notes, and affiliate links.",
      items: [
        { name: "Cream pointed heels", href: "#", affiliate: "placeholder-heels" }
      ],
      credit: "Stock photo via Unsplash, used only to show the layout.",
      placeholder: true
    },
    {
      id: "sample-gold-hour",
      title: "Gold hour",
      titlePrefix: "Sample look",
      image: "assets/images/look-gold-hoops.webp",
      imageAlt: "Detail from Cristel Monrose’s official brand photography: a gold hoop earring and a gold chain at the neck. Used here as a placeholder for a jewelry look, not a confirmed show outfit.",
      note: "Placeholder for jewelry worn on the show — hoops, chains, or a daily gold piece. Replace with the real look and affiliate links.",
      items: [
        { name: "Gold hoop earrings", href: "#", affiliate: "placeholder-hoops" },
        { name: "Everyday gold chain", href: "#", affiliate: "placeholder-chain" }
      ],
      credit: "Detail from official Cristel Monrose brand photography.",
      placeholder: true
    },
    {
      id: "sample-red-lip",
      title: "Red lip, rosé night",
      titlePrefix: "Sample look",
      image: "assets/images/look-lemons.webp",
      imageAlt: "Lemons and pink hydrangeas in a glass vase, from Cristel Monrose’s official brand photography. Used here as a placeholder for a beauty and table look, not a confirmed show outfit.",
      note: "Placeholder for a beauty and table look from the show. Replace with the real products, notes, and affiliate links.",
      items: [
        { name: "A perfect red lip", href: "#", affiliate: "placeholder-lipstick" },
        { name: "A glass of rosé", href: "#", affiliate: "placeholder-wine" }
      ],
      credit: "Detail from official Cristel Monrose brand photography.",
      placeholder: true
    }
  ]
};
