# =======================================================
# CONEXION CON POSTGRESQL / INSTALA Y CREA LAS TABLAS :V
# =======================================================
import psycopg2
import psycopg2.extras

def conexion_database():
    try:
        conexion = psycopg2.connect(
            dbname='epic-uc',
            user='postgres',
            password='251204',
            host='localhost',
            port='5432'
        )
        cursor = conexion.cursor(cursor_factory=psycopg2.extras.DictCursor)
        print("✅ Conexión exitosa a la base de datos")
        return conexion, cursor
    except Exception as e:
        print(f"❌ Error al conectar: {e}")
        raise

def prueba_de_conexion():
    try:
        conn, cur = conexion_database()
        cur.execute("SELECT current_database();")
        print("📌 Base actual:", cur.fetchone()["current_database"])
        cur.close()
        conn.close()
    except Exception as e:
        print(f"❌ Error en la prueba: {e}")

# =======================================================
# PRUEBA DE CONEXION // ELIMINA EL #
# =======================================================

#prueba_de_conexion()
