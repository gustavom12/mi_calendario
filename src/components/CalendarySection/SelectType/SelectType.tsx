import React, { useContext, useEffect } from 'react';
import TurnResponseContext from '../../../context/turnResponseContext';
import useFetch, { url } from '../../../helpers&hooks/useFetch';
const SelectType = ({ selectedType, setSelectedType }: { selectedType: any, setSelectedType: any }) => {
  const { data }: { data: any, loading: boolean } = useFetch(`${url}categorias_listar.php`)
  const turnPostedData = useContext<any>(TurnResponseContext)
  useEffect(() => {
    if (!data) return;
    setSelectedType(data[0])
  }, [data, setSelectedType])
  return (
    <div className="SelectType column">
      <h6 className="m-0 fw-bold mb-3">Selecciona una opción</h6>
      {data && data?.length &&
        data.map((type: any, i: number) =>
          <div
            className={`
              mt-2 type ${selectedType?.CategoriaId === type?.CategoriaId && "active"}
              ${turnPostedData?.data?.result?.mensaje && "success"}
              `}
            onClick={() => {
              if (!turnPostedData?.data?.result?.mensaje) setSelectedType(type)
            }}
            key={i}
          >
            <h2 className="mb-0 text-capitalize">{type.nombre}</h2>
            <div className="d-flex justify-content-between">
              <h6 className="d-flex fw-bold my-2">
                <i className="fas fa-clock my-auto"></i>
                <span className="mx-2">{type.duracion_minutos} min </span>
              </h6>
              <h6 className="d-flex align-items-center fw-bold my-2">
                <i className="fas fa-money-bill-wave"></i>
                <span className="my-auto mx-1">${type.costo.split(".")[0]} </span>
              </h6>
            </div>
          </div>
        )
      }
    </div>
  )
}
export default SelectType
