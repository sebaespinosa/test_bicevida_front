import React from 'react'
import { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'

export default function Home() {

    const seguros = [
        { label: 'Seguro Vida Activa', value: '58' },
        { label: 'Seguro Viaje Protegido', value: '59' }
    ]

    const segurosInfoBCK = [
        {
            id: 58,
            name: "Seguro Vida Activa",
            description: "Con nuestro Seguro Vida Activa podrás disfrutar el día a día con tranquilidad, gracias al respaldo y apoyo frente a las consecuencias de eventuales accidentes que puedas sufrir. Posee excelente cobertura, un precio muy conveniente y, en caso de fallecimiento, apoyo financiero para tus seres queridos con un capital asegurado.",
            price: "9000",
            image: "https://ventaenlinea.bicevida.cl/pub/media/catalog/product/cache/69eb2560c3d44c78f7327201dc5a282b/i/m/img-01.jpg"
        },
        {
            id: 59,
            name: "Seguro Viaje Protegido",
            description: "El Seguro Viaje Protegido cuenta con una cobertura de Muerte Accidental y Asistencia en Viaje, que protege al titular en caso de accidente durante el traslado y periodo del viaje, junto con otorgar servicios de asistencia en viaje tanto para el titular como a sus acompañantes. Contamos con coberturas de USD 60.000 para menores de 85 años y coberturas de USD 150.000 y USD 250.000 para menores de 69 años.",
            price: "8000",
            image: "https://ventaenlinea.bicevida.cl/pub/media/catalog/product/cache/69eb2560c3d44c78f7327201dc5a282b/i/m/img-02.jpg"
        }
    ]

    const [selectedSeguro, setSelectedSeguro] = useState(null);

    const [selectClass, setSelectClass] = useState('select-bice');

    const [seguroInfo, setSeguroInfo] = useState(<div id="seguro-info-container"></div>);


    const handleSelectChange = ( option ) => {
        setSelectedSeguro(option.value);
        setSelectClass('select-bice-selected');
    }

    const completeSeguroInfo = (titulo, parrafo, label, image) => {
        return (
            <div className='card text-left' style={{width: '18 rem'}}>
                    <img className='card-img-top' src={image}></img>
                    <label className='card-img-overlay-label'>{label}</label>
                    <div className='card-body'>
                        <h5 className='card-title'>{titulo}</h5>
                        <p className='card-text'>{parrafo}</p>
                    </div>
            </div>
        );
    }

    const getInfoSeguro = () => {
        if(selectedSeguro === null) { alert("Debes seleccionar un seguro primero")}
        else {

            axios.get(`https://dn8mlk7hdujby.cloudfront.net/interview/insurance/${selectedSeguro}`).then((response) => {
                setSeguroInfo( completeSeguroInfo(response.data.insurance.name, response.data.insurance.description, response.data.insurance.price, response.data.insurance.image) );
            }).catch((error) => {
                    alert ("Se produjo un error en la solicitud de la información a la API, seguramente debido a que CORS no está habilitado en el Endpoint. Para este ejercicio se completará la información obtenida desde el mismo código. Endpoint consultado: " + `https://dn8mlk7hdujby.cloudfront.net/interview/insurance/${selectedSeguro}`);
                    let seguro = segurosInfoBCK.filter( seguro => { return seguro.id == selectedSeguro });
                    console.log(seguro);
                    setSeguroInfo( completeSeguroInfo(seguro[0].name, seguro[0].description, seguro[0].price, seguro[0].image) );
                }
            );
        }
    }

  return (
    <div>
        <br />
        <div className='row'>
            <div className='col-3'></div>
            <div className='col-6'>
                <br />
                <label>Selecciona un seguro</label>
                <div className='row'>
                    <div className='col-9'>
                        <Select
                        //defaultValue = { {label: 'Seleccionar...', value: ''} }
                        options = { seguros }
                        onChange = { handleSelectChange }
                        className = {selectClass}
                        />
                    </div>
                    <div className='col-3'>
                        <button type="button" className='button-bice' onClick={getInfoSeguro}>Ver</button>
                    </div>
                </div>
                <br />
                <br />
                <div className='row d-flex justify-content-center'>
                    <div className='col-6'>{ seguroInfo }</div>
                </div>
            </div>
            <div className='col-3'></div>
        </div>
    </div>
  )
}
