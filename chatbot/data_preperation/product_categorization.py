import json
import os
from glob import glob
from dotenv import load_dotenv
import openai
import time

YOUR_PARSED_PRODUCTS_FOLDER_PATH = "C:/Users/Jana Trpkovska/Desktop/Chatbot/chatbot/parsed_products/"

load_dotenv(dotenv_path='../env')

openai.api_key = os.getenv("OPENAI_API_KEY")


# Function to get embeddings
def get_embedding(text, model="text-embedding-ada-002"):
    response = openai.Embedding.create(input=text, model=model)
    return response['data'][0]['embedding']


# Function to vectorize product descriptions
def vectorize_descriptions(products):
    embeddings_list = []
    for p in products:
        description = json.dumps(p["description"], ensure_ascii=False)
        embedding = get_embedding(description)
        embeddings_list.append(embedding)
    return embeddings_list


# Function to categorize products
def categorize_products(products, embeddings, max_retries=3):
    categories = []
    for i, product in enumerate(products):
        prompt = f"""
        Given the following product description, assign a category to this product. The category should be a single word that best describes the product.

        Description: {product['description']}

        Only provide the category name, without any prefix or additional text.
        """

        # In case of server errors --> 3 retries per product
        retries = 0
        while retries < max_retries:
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=10
                )
                category = response['choices'][0]['message']['content'].strip().split("\n")[0]
                categories.append(category)
                break
            except openai.error.OpenAIError as e:
                print(f"Error for product {i}: {e}")
                retries += 1
                if retries == max_retries:
                    categories.append("Unknown")
                    print(f"Failed to categorize product {i} after {max_retries} retries.")
                else:
                    time.sleep(2)
    return categories


if __name__ == '__main__':
    parsed_products = []
    file_names = glob(YOUR_PARSED_PRODUCTS_FOLDER_PATH + "*.json")
    for fname in file_names:
        with open(fname, 'r', encoding='utf-8') as f:
            product = json.load(f)
            parsed_products.append(product)

    print("Vectorizing descriptions...")
    embeddings = vectorize_descriptions(parsed_products)

    print("Categorizing products...")
    categories = categorize_products(parsed_products, embeddings)

    print("Saving categorized products...")
    for i, product in enumerate(parsed_products):
        product["category"] = categories[i]
        file_name = os.path.basename(file_names[i])
        with open(os.path.join(YOUR_PARSED_PRODUCTS_FOLDER_PATH, file_name), 'w', encoding='utf-8') as f:
            json.dump(product, f, ensure_ascii=False, indent=4)

    print("Categorized products saved successfully.")
