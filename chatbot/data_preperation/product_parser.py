import json
import os
from glob import glob

from dotenv import load_dotenv

from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

from output_parsers import description_parser, Description

YOUR_PRODUCTS_FOLDER_PATH = "C:/Users/drist/Documents/GitHub/Chatbot/chatbot/products/"
YOUR_PARSED_PRODUCTS_FOLDER_PATH = "C:/Users/drist/Documents/GitHub/Chatbot/chatbot/parsed_products/"

if __name__ == '__main__':
    # load environment variables
    load_dotenv()

    # indexes of products that caught an error
    error_indexes = []

    # iterate each json file
    for index, fname in enumerate(glob(YOUR_PRODUCTS_FOLDER_PATH + "*.json")):
        # read file
        with open(fname, 'r', encoding='utf-8') as f:

            # load to json
            product = json.load(f)

            # get file name
            file_name = fname.split("\\")[1]

            # create template
            summary_template = """
            given the product description: {description} I want you to parse it as a dictionary. 
            For boolean values use true/false. Values need to be in macedonian language
            
            {format_instructions}
            """

            # create prompt template with context
            summary_prompt_template = PromptTemplate(
                input_variables=["description"],
                template=summary_template,
                partial_variables={"format_instructions": description_parser.get_format_instructions()}
            )

            # load model
            llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

            # create chain
            chain = summary_prompt_template | llm | description_parser


            has_error = False
            # invoke chain, if an error is caught print to document and continue
            try:
                result: Description = chain.invoke(input={"description": product["description"]})
            except:
                print(f"Error in product {index}.")
                error_indexes.append(index)
                f = open("errors.txt", "a")
                f.write(f"Product {index} error: {file_name}\n")
                has_error = True
                continue

            # add parsed description to json
            product["description"] = result.description

            # save to directory
            with open(YOUR_PARSED_PRODUCTS_FOLDER_PATH + file_name, 'w', encoding='utf-8') as f:
                json.dump(product, f, ensure_ascii=False, indent=4)

            if not has_error:
                print(f"Product {index} parsed.")
    # after for loop, print all error indexes list to document for debugging
    f = open("errors.txt", "a")
    f.write(f"Errors in products:\n{str(error_indexes)}\n")
