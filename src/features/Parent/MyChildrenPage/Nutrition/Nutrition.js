import { NUTRITION_CATEGORIZE } from "../../../../constants/nutritionConstants";

// AgeFrom and ageTo, age unit is Months.

const CHILD_NUTRITION = [
  {
    title: "Baby nutrition 0 - 6 month",
    category: NUTRITION_CATEGORIZE.ZERO_TO_SIX_MONTH,
    desc: "Breastfeeding is one of the most effective ways to ensure child health and survival",
    ageFrom: -1,
    ageTo: -5,
    content: [
      {
        subTitle: "Mothers initiate breastfeeding within one hour of birth",
      },
      {
        subTitle:
          "Breast milk contains all the nutrients your baby needs for the first 6 months",
      },
      {
        subTitle: "It also satisfies the baby’s thirst",
      },
      {
        subTitle: "It helps develop the eyes and brain and other body systems",
      },
      {
        subTitle: "The act of breastfeeding helps with jaw development",
      },
      {
        subTitle:
          "It helps the baby resist infection and disease, even later in life",
      },
      {
        subTitle:
          "It reduces the risk of obesity in childhood and later in life",
      },
      {
        subTitle:
          "It contains a range of factors that protect your baby while their immune system is still developing",
      },
      {
        subTitle:
          "Breastfeeding should continue for up to two years or beyond.",
      },
    ],
  },
  {
    title: "Baby nutrition 0 - 6 month",
    category: NUTRITION_CATEGORIZE.ZERO_TO_SIX_MONTH,
    desc: "During the first week of life most babies will gradually develop a pattern of feeding eight to twelve times in a 24-hour period. You should feed your baby whenever he or she shows signs of hunger. You will know your baby is getting enough breast milk if he or she:",
    ageFrom: -1,
    ageTo: -5,
    content: [
      {
        subTitle:
          "Is feeding at least 8 times a day (with some of those feeds occurring overnight)",
      },
      {
        subTitle:
          "Has at least 5 wet disposable nappies or 6 to 8 wet cloth nappies per day",
      },
      {
        subTitle:
          "Has 2 or more soft or runny bowel movements per day for around the first 6 weeks of life (babies have fewer bowel movements once they reach about 6 weeks)",
      },
      {
        subTitle: "Is gaining weight and growing as expected",
      },
      {
        subTitle: "Is alert when awake, and reasonably contented",
      },
      {
        subTitle:
          "Let your baby feed until he or she stops sucking and swallowing and lets go of your breast, and then offer your second breast",
      },
      {
        subTitle: "Offer your breast at night as well as during the day",
      },
      {
        subTitle:
          "Avoid giving any extra feeds from bottles, as this reduces your baby’s need to suck at your breast and reduces your milk supply",
      },
      {
        subTitle: "Avoid the use of dummies (pacifiers)",
      },
    ],
  },
  {
    title: "Solid foods should be phased in at six months",
    category: NUTRITION_CATEGORIZE.ZERO_TO_SIX_MONTH,
    desc: "To meet the growing needs of babies at six months of age, mashed solid foods should be introduced as a complement to continued breastfeeding. Foods for the baby can be specially prepared or modified from family meals. WHO notes that",
    ageFrom: -1,
    ageTo: -5,
    content: [
      {
        subTitle:
          "Breastfeeding should not be decreased when starting on solids",
      },
      {
        subTitle: "Food should be given with a spoon or cup, not in a bottle",
      },
      {
        subTitle: "Food should be clean and safe",
      },
      {
        subTitle:
          "Ample time is needed for young children to learn to eat solid foods",
      },
    ],
  },
  {
    title: "Solid foods should be phased in at six months",
    category: NUTRITION_CATEGORIZE.ZERO_TO_SIX_MONTH,
    desc: "Breastfeeding is one of the most effective ways to ensure child health and survival.",
    ageFrom: 0,
    ageTo: 6,
    content: [
      {
        subTitle:
          "During the first week of life most babies will gradually develop a pattern of feeding eight to twelve times in a 24-hour period.",
      },
      {
        subTitle:
          "You should feed your baby whenever he or she shows signs of hunger.",
      },
    ],
  },
  {
    title: "Breakfast",
    category: NUTRITION_CATEGORIZE.BREAKFIRST,
    desc: "",
    ageFrom: 6,
    ageTo: 24,
    content: [
      {
        subTitle: "Milk",
        titleDesc: [
          {
            desc: "Fluid milk",
            amount: "1/2 cup",
          },
        ],
      },
      {
        subTitle: "Vegetables and Fruits",
        titleDesc: [
          {
            desc: "Vegetable(s) and/or fruit(s)",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR Full-strength vegetable or fruit juice",
            amount: "1/4 cup",
          },
        ],
      },
      {
        subTitle: "Grains/Breads",
        titleDesc: [
          {
            desc: "Bread",
            amount: "1/2 slice",
          },
          {
            desc: "-- OR cornbread, biscuits, rolls, muffins, etc.",
            amount: "1/2 serving",
          },
          {
            desc: "-- OR cold dry cereal",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR cooked cereal grains",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR cooked pasta or noodle products",
            amount: "1/4 cup",
          },
        ],
      },
    ],
  },
  {
    title: "Lunch",
    category: NUTRITION_CATEGORIZE.LUNCH,
    desc: "",
    ageFrom: 6,
    ageTo: 24,
    content: [
      {
        subTitle: "Milk",
        titleDesc: [
          {
            desc: "Fluid milk",
            amount: "1/2 cup",
          },
        ],
      },
      {
        subTitle: "Vegetables and Fruits",
        titleDesc: [
          {
            desc: "Vegetable(s) and/or fruit(s)",
            amount: "2 or more 1/4 cup",
          },
        ],
      },
      {
        subTitle: "Grains/Breads",
        titleDesc: [
          {
            desc: "Bread",
            amount: "1/2 slice",
          },
          {
            desc: "-- OR cornbread, biscuits, rolls, muffins, etc.",
            amount: "1/2 serving",
          },
          {
            desc: "-- OR cold dry cereal",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR cooked cereal grains",
            amount: "1/4 cup",
          },
        ],
      },
      {
        subTitle: "Meat and Meat Alternates",
        titleDesc: [
          {
            desc: "Lean meat or poultry or fish",
            amount: "1oz",
          },
          {
            desc: "-- OR alternate protein products",
            amount: "1oz",
          },
          {
            desc: "-- OR cheese",
            amount: "1oz",
          },
          {
            desc: "-- OR Egg (large)",
            amount: "1/2 egg",
          },
          {
            desc: "-- OR cooked dry beans or peas",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR peanut butter or soynut butter or other nut/seed butters",
            amount: "2 Tbsp",
          },
          {
            desc: "-- OR peanuts or soynuts or tree nuts or seeds",
            amount: "½ oz",
          },
          {
            desc: "Yogurt, plain or flavored, unsweetened or sweetened",
            amount: "½ cup",
          },
        ],
      },
    ],
  },
  {
    title: "Snack (select 2 different components)",
    category: NUTRITION_CATEGORIZE.SNACK,
    desc: "",
    ageFrom: 6,
    ageTo: 24,
    content: [
      {
        subTitle: "Milk",
        titleDesc: [
          {
            desc: "Fluid milk",
            amount: "1/2 cup",
          },
        ],
      },
      {
        subTitle: "Vegetables and Fruits",
        titleDesc: [
          {
            desc: "Vegetable(s) and/or fruit(s)",
            amount: "2 or more 1/4 cup",
          },
          {
            desc: "-- OR Full-strength vegetable or fruit juice",
            amount: "1/2 cup",
          },
        ],
      },
      {
        subTitle: "Grains/Breads",
        titleDesc: [
          {
            desc: "Bread",
            amount: "1/2 slice",
          },
          {
            desc: "-- OR cornbread, biscuits, rolls, muffins, etc.",
            amount: "1/2 serving",
          },
          {
            desc: "-- OR cold dry cereal",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR cooked cereal grains",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR cooked pasta or noodle products",
            amount: "1/4 cup",
          },
        ],
      },
      {
        subTitle: "Meat and Meat Alternates",
        titleDesc: [
          {
            desc: "Lean meat or poultry or fish",
            amount: "1/2 oz",
          },
          {
            desc: "-- OR alternate protein products",
            amount: "1/2 oz",
          },
          {
            desc: "-- OR cheese",
            amount: "1/2 oz",
          },
          {
            desc: "-- OR Egg (large)",
            amount: "1/2 egg",
          },
          {
            desc: "-- OR cooked dry beans or peas",
            amount: "1/8 cup",
          },
          {
            desc: "-- OR peanut butter or soynut butter or other nut/seed butters",
            amount: "1 Tbsp",
          },
          {
            desc: "-- OR peanuts or soynuts or tree nuts or seeds",
            amount: "½ oz",
          },
          {
            desc: "Yogurt, plain or flavored, unsweetened or sweetened",
            amount: "½ cup",
          },
        ],
      },
    ],
  },
  {
    title: "Breakfast",
    category: NUTRITION_CATEGORIZE.BREAKFIRST,
    desc: "",
    ageFrom: 36,
    ageTo: 60,
    content: [
      {
        subTitle: "Milk",
        titleDesc: [
          {
            desc: "Fluid milk",
            amount: "3/4 cup",
          },
        ],
      },
      {
        subTitle: "Vegetables and Fruits",
        titleDesc: [
          {
            desc: "Vegetable(s) and/or fruit(s)",
            amount: "1/2 cup",
          },
          {
            desc: "-- OR Full-strength vegetable or fruit juice",
            amount: "1/2 cup",
          },
        ],
      },
      {
        subTitle: "Grains/Breads",
        titleDesc: [
          {
            desc: "Bread",
            amount: "1/2 slice",
          },
          {
            desc: "-- OR cornbread, biscuits, rolls, muffins, etc.",
            amount: "1/2 serving",
          },
          {
            desc: "-- OR cold dry cereal",
            amount: "1/3 cup",
          },
          {
            desc: "-- OR cooked cereal grains",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR cooked pasta or noodle products",
            amount: "1/4 cup",
          },
        ],
      },
    ],
  },
  {
    title: "Lunch",
    category: NUTRITION_CATEGORIZE.LUNCH,
    desc: "",
    ageFrom: 36,
    ageTo: 60,
    content: [
      {
        subTitle: "Milk",
        titleDesc: [
          {
            desc: "Fluid milk",
            amount: "3/4 cup",
          },
        ],
      },
      {
        subTitle: "Vegetables and Fruits",
        titleDesc: [
          {
            desc: "Vegetable(s) and/or fruit(s)",
            amount: "2 or more 1/2 cup",
          },
        ],
      },
      {
        subTitle: "Grains/Breads",
        titleDesc: [
          {
            desc: "Bread",
            amount: "1/2 slice",
          },
          {
            desc: "-- OR cornbread, biscuits, rolls, muffins, etc.",
            amount: "1/2 serving",
          },
          {
            desc: "-- OR cold dry cereal",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR cooked cereal grains",
            amount: "1/4 cup",
          },
        ],
      },
      {
        subTitle: "Meat and Meat Alternates",
        titleDesc: [
          {
            desc: "Lean meat or poultry or fish",
            amount: "1 ½ oz",
          },
          {
            desc: "-- OR alternate protein products",
            amount: "1 ½ oz",
          },
          {
            desc: "-- OR cheese",
            amount: "1 ½ oz",
          },
          {
            desc: "-- OR Egg (large)",
            amount: "3/4 egg",
          },
          {
            desc: "-- OR cooked dry beans or peas",
            amount: "3/8 cup",
          },
          {
            desc: "-- OR peanut butter or soynut butter or other nut/seed butters",
            amount: "3 Tbsp",
          },
          {
            desc: "-- OR peanuts or soynuts or tree nuts or seeds",
            amount: "3/4 oz",
          },
          {
            desc: "Yogurt, plain or flavored, unsweetened or sweetened",
            amount: "3/4 cup",
          },
        ],
      },
    ],
  },
  {
    title: "Snack (select 2 different components)",
    category: NUTRITION_CATEGORIZE.SNACK,
    desc: "",
    ageFrom: 36,
    ageTo: 60,
    content: [
      {
        subTitle: "Milk",
        titleDesc: [
          {
            desc: "Fluid milk",
            amount: "3/4 cup",
          },
        ],
      },
      {
        subTitle: "Vegetables and Fruits",
        titleDesc: [
          {
            desc: "Vegetable(s) and/or fruit(s)",
            amount: "1/2 cup",
          },
          {
            desc: "-- OR Full-strength vegetable or fruit juice",
            amount: "1/2 cup",
          },
        ],
      },
      {
        subTitle: "Grains/Breads",
        titleDesc: [
          {
            desc: "Bread",
            amount: "1/2 slice",
          },
          {
            desc: "-- OR cornbread, biscuits, rolls, muffins, etc.",
            amount: "1/2 serving",
          },
          {
            desc: "-- OR cold dry cereal",
            amount: "1/3 cup",
          },
          {
            desc: "-- OR cooked cereal grains",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR cooked pasta or noodle products",
            amount: "1/4 cup",
          },
        ],
      },
      {
        subTitle: "Meat and Meat Alternates",
        titleDesc: [
          {
            desc: "Lean meat or poultry or fish",
            amount: "1/2 oz",
          },
          {
            desc: "-- OR alternate protein products",
            amount: "1/2 oz",
          },
          {
            desc: "-- OR cheese",
            amount: "1/2 oz",
          },
          {
            desc: "-- OR Egg (large)",
            amount: "1/2 egg",
          },
          {
            desc: "-- OR cooked dry beans or peas",
            amount: "1/8 cup",
          },
          {
            desc: "-- OR peanut butter or soynut butter or other nut/seed butters",
            amount: "1 Tbsp",
          },
          {
            desc: "-- OR peanuts or soynuts or tree nuts or seeds",
            amount: "½ oz",
          },
          {
            desc: "Yogurt, plain or flavored, unsweetened or sweetened",
            amount: "1/4 cup",
          },
        ],
      },
    ],
  },
  {
    title: "breakfast",
    category: NUTRITION_CATEGORIZE.BREAKFIRST,
    desc: "",
    ageFrom: 72,
    ageTo: 144,
    content: [
      {
        subTitle: "Milk",
        titleDesc: [
          {
            desc: "Fluid milk",
            amount: "1 cup",
          },
        ],
      },
      {
        subTitle: "Vegetables and Fruits",
        titleDesc: [
          {
            desc: "Vegetable(s) and/or fruit(s)",
            amount: "1/2 cup",
          },
          {
            desc: "-- OR Full-strength vegetable or fruit juice",
            amount: "1/2 cup",
          },
        ],
      },
      {
        subTitle: "Grains/Breads",
        titleDesc: [
          {
            desc: "Bread",
            amount: "1 slice",
          },
          {
            desc: "-- OR cornbread, biscuits, rolls, muffins, etc.",
            amount: "1 serving",
          },
          {
            desc: "-- OR cold dry cereal",
            amount: "3/4 cup",
          },
          {
            desc: "-- OR cooked cereal grains",
            amount: "1/2 cup",
          },
          {
            desc: "-- OR cooked pasta or noodle products",
            amount: "1/2 cup",
          },
        ],
      },
    ],
  },
  {
    title: "Lunch",
    category: NUTRITION_CATEGORIZE.LUNCH,
    desc: "",
    ageFrom: 72,
    ageTo: 144,
    content: [
      {
        subTitle: "Milk",
        titleDesc: [
          {
            desc: "Fluid milk",
            amount: "1 cup",
          },
        ],
      },
      {
        subTitle: "Vegetables and Fruits",
        titleDesc: [
          {
            desc: "Vegetable(s) and/or fruit(s)",
            amount: "2 or more 3/4 cup",
          },
        ],
      },
      {
        subTitle: "Grains/Breads",
        titleDesc: [
          {
            desc: "Bread",
            amount: "1 slice",
          },
          {
            desc: "-- OR cornbread, biscuits, rolls, muffins, etc.",
            amount: "1 serving",
          },
          {
            desc: "-- OR cold dry cereal",
            amount: "1/2 cup",
          },
          {
            desc: "-- OR cooked cereal grains",
            amount: "1/2 cup",
          },
        ],
      },
      {
        subTitle: "Meat and Meat Alternates",
        titleDesc: [
          {
            desc: "Lean meat or poultry or fish",
            amount: "2 oz",
          },
          {
            desc: "-- OR alternate protein products",
            amount: "2 oz",
          },
          {
            desc: "-- OR cheese",
            amount: "2 oz",
          },
          {
            desc: "-- OR Egg (large)",
            amount: "1 egg",
          },
          {
            desc: "-- OR cooked dry beans or peas",
            amount: "1/2 cup",
          },
          {
            desc: "-- OR peanut butter or soynut butter or other nut/seed butters",
            amount: "4 Tbsp",
          },
          {
            desc: "-- OR peanuts or soynuts or tree nuts or seeds",
            amount: "1 oz",
          },
          {
            desc: "Yogurt, plain or flavored, unsweetened or sweetened",
            amount: "1 cup",
          },
        ],
      },
    ],
  },
  {
    title: "Snack (select 2 different components)",
    category: NUTRITION_CATEGORIZE.SNACK,
    desc: "",
    ageFrom: 72,
    ageTo: 144,
    content: [
      {
        subTitle: "Milk",
        titleDesc: [
          {
            desc: "Fluid milk",
            amount: "1 cup",
          },
        ],
      },
      {
        subTitle: "Vegetables and Fruits",
        titleDesc: [
          {
            desc: "Vegetable(s) and/or fruit(s)",
            amount: "3/4 cup",
          },
          {
            desc: "-- OR Full-strength vegetable or fruit juice",
            amount: "3/4 cup",
          },
        ],
      },
      {
        subTitle: "Grains/Breads",
        titleDesc: [
          {
            desc: "Bread",
            amount: "1 slice",
          },
          {
            desc: "-- OR cornbread, biscuits, rolls, muffins, etc.",
            amount: "1 serving",
          },
          {
            desc: "-- OR cold dry cereal",
            amount: "3/4 cup",
          },
          {
            desc: "-- OR cooked cereal grains",
            amount: "1/2 cup",
          },
          {
            desc: "-- OR cooked pasta or noodle products",
            amount: "1/2 cup",
          },
        ],
      },
      {
        subTitle: "Meat and Meat Alternates",
        titleDesc: [
          {
            desc: "Lean meat or poultry or fish",
            amount: "1 oz",
          },
          {
            desc: "-- OR alternate protein products",
            amount: "1 oz",
          },
          {
            desc: "-- OR cheese",
            amount: "1 oz",
          },
          {
            desc: "-- OR Egg (large)",
            amount: "1/2 egg",
          },
          {
            desc: "-- OR cooked dry beans or peas",
            amount: "1/4 cup",
          },
          {
            desc: "-- OR peanut butter or soynut butter or other nut/seed butters",
            amount: "2 Tbsp",
          },
          {
            desc: "-- OR peanuts or soynuts or tree nuts or seeds",
            amount: "1 oz",
          },
          {
            desc: "Yogurt, plain or flavored, unsweetened or sweetened",
            amount: "1/2 cup",
          },
        ],
      },
    ],
  },
];

export default CHILD_NUTRITION;
