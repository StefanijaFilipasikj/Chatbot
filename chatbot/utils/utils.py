table_description = [
    {
        "name": "product",
        "description": "the products table",
        "columns": [
            {
                "name": "id",
                "description": "the product primary key"
            },
            {
                "name": "title",
                "description": "THE PRODUCT TITLE INCLUDING THE BRAND IN UPPER CASE"
            },
            {
                "name": "warranty",
                "description": "the product warranty"
            },
            {
                "name": "regular_price",
                "description": "the product regular price"
            },
            {
                "name": "happy_price",
                "description": "the product discounted price"
            },
            {
                "name": "category",
                "description": "the product category"
            }
        ]
    },
    {
        "name": "description",
        "description": "the description table",
        "columns": [
            {
                "name": "product_id",
                "description": "foreign key to table product"
            },
            {
                "name": "key",
                "description": "name of description"
            },
            {
                "name": "value",
                "description": "value of description"
            }
        ]
    }
]