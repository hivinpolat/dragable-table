from fastapi import FastAPI
from fastapi.openapi.models import Info, License, OpenAPI, Server
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Pivot Table API",
    version="1.0.0",
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
)

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # İstemci uygulamanızın URL'sini ekleyin
    allow_credentials=True,
    allow_methods=["*"],  # Tüm HTTP metotlarına izin vermek isterseniz
    allow_headers=["*"],  # Tüm başlık alanlarına izin vermek isterseniz
)

app.mount("/static", StaticFiles(directory="static"), name="static")


class PivotTableItem(BaseModel):
    item: str


pivot_table_items = []


@app.get("/")
def read_root():
    return {"message": "Pivot Table Example"}


@app.get("/api/pivot_table")
def get_pivot_table():
    return pivot_table_items


@app.post("/api/pivot_table")
def add_pivot_table_item(item_data: PivotTableItem):
    pivot_table_items.append(item_data.item)
    return {"message": "Item added successfully"}


@app.get("/api/openapi.json", response_model=OpenAPI)
async def get_openapi():
    return app.openapi()

def main():
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()
 
