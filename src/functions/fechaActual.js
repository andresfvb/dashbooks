export class operation {
    sacarFecha=(dato)=>{
        const fechaActual = new Date();

        // Obtiene el año, mes y día por separado
        const year = fechaActual.getFullYear();
        const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Asegura que el mes tenga dos dígitos
        const day = String(fechaActual.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos

        // Formatea la fecha en el formato "YYYY-MM-DD"
        const fechaFormateada = `${year}-${month}-${day}`
        return fechaFormateada
    }
    sacarFechaAtras=(dato)=>{
        const fechaActual = new Date();

        // Obtiene el año, mes y día por separado
        const year = fechaActual.getFullYear()-10;
        const month = String(fechaActual.getMonth() - 5).padStart(2, '0'); // Asegura que el mes tenga dos dígitos
        const day = String(fechaActual.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos

        // Formatea la fecha en el formato "YYYY-MM-DD"
        const fechaFormateada = `${year}-${month}-${day}`
        return fechaFormateada
    }
    
}