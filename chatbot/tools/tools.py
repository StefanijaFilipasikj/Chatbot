from langchain.tools import tool
import psycopg2

@tool
def execute_sql_query(query: str):
    """Executes sql query"""
    query = query.replace("\"", "").replace("`", "").replace("sql", "")
    con = psycopg2.connect(
        host = 'localhost',
        dbname = 'chatbot_db',
        user = 'postgres',
        password = 'password',
        port = 5432
    )
    cur = con.cursor()
    cur.execute(query)
    return cur.fetchall()