import React, { useEffect, useState } from 'react';
import useFetch, { url, useFetchPost } from '../../../../helpers&hooks/useFetch';
import './Category.sass'
const Category = () => {
  const { data }: { data: any, loading: boolean } = useFetch(url + "categorias_listar.php")
  const [categories, setCategories] = useState<any>(null);
  const categoryPost = useFetchPost()
  const [CategoryInput, setCategoryInput] = useState({
    costo: 500,
    nombre: "",
    CategoriaId: 0,
    duracion_minutos: 30
  });
  useEffect(() => {
    if (!data) return;
    setCategories(data);
  }, [data])
  async function eliminarCategoria(categoria: any, index: number) {
    categoryPost.Post({ url: `${url}categoria_eliminar.php?id="${categoria.CategoriaId}"`, body: {} })
    categories.splice(index, 1)
    setCategories([...categories])
  }
  const onSubmit = (e: any) => {
    e.preventDefault()
    categoryPost.Post({ url: `${url}categorias_registrar.php`, body: CategoryInput })
    if (CategoryInput.CategoriaId) {
      const newCategorias = categories.filter((a: any) => a.CategoriaId !== CategoryInput.CategoriaId)
      newCategorias.push(CategoryInput)
      setCategories([...newCategorias])
    }
  }
  return (
    <div className="Categories pb-4">
      <h2 className="text-center fw-bold"> Categorias de turnos </h2>
      <form onSubmit={onSubmit} className="AddCategory">
        <h4 className="fw-bold text-center">{!CategoryInput.CategoriaId ? "Crear Categoria" : "Actualizar Categoria"}</h4>
        <span className="fw-bold">Nombre</span>
        <input
          type="text"
          className="form-control"
          minLength={3}
          value={CategoryInput.nombre}
          onChange={(e: any) => setCategoryInput({ ...CategoryInput, nombre: e.target.value })}
        />
        <span className="fw-bold mt-3">Precio</span>
        <input
          type="number"
          className="form-control"
          value={CategoryInput.costo}
          onChange={(e: any) => setCategoryInput({ ...CategoryInput, costo: e.target.value })}
        />
        <span className="fw-bold mt-3">Duración</span>
        <select
          className={`form-select form-select`}
          value={CategoryInput.duracion_minutos}
          onChange={(e: any) => setCategoryInput({ ...CategoryInput, duracion_minutos: e.target.value })}
        >
          <option value="10">10min</option>
          <option value="20">20min</option>
          <option value="30">30min</option>
          <option value="40">40min</option>
          <option value="50">50min</option>
          <option value="60">60min</option>
          <option value="70">70min</option>
          <option value="80">80min</option>
          <option value="90">90min</option>
          <option value="100">100min</option>
          <option value="110">110min</option>
          <option value="120">120min</option>
          <option value="130">130min</option>
          <option value="140">140min</option>
          <option value="150">150min</option>
          <option value="160">160min</option>
          <option value="170">170min</option>
          <option value="180">180min</option>
          <option value="190">190min</option>
          <option value="200">200min</option>
          <option value="210">210min</option>
          <option value="220">220min</option>
        </select>
        {categoryPost.data && <p className="text-success text-center">{categoryPost.data.result.mensaje}</p>}
        <div className="flex mt-5">
          <button type="submit" className="btn btn-primary w-75 fw-bold">
            {!CategoryInput.CategoriaId ? "Crear Categoria" : "Actualizar Categoria"}
          </button>
        </div>
      </form>
      {categories && categories.map((category: any, i: number) =>
        <div className="category cursor-pointer mb-4 w-100" key={i}
          style={{
            background: "#00000010",
            padding: 10
          }}
          onClick={() => setCategoryInput({ ...category })}
        >
          <i className="fas fa-trash text-danger" onClick={() => eliminarCategoria(category, i)}></i>
          <h5 className="fw-bold text-center"> {category.nombre} </h5>
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold" >
              <i className="fas fa-clock mx-2"></i>
              <span>{category.duracion_minutos}min</span>
            </h5>
            <h5 className="fw-bold text-primary"><i className="fas fa-edit"></i></h5>
            <h5 className="fw-bold">
              <i className="fas fa-money-bill-wave mx-2"></i>
              <span>${category.costo}</span>
            </h5>
          </div>
        </div>
      )}
    </div>
  )
}
export default Category
