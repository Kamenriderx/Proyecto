
const getCalendarTemplate = (content) => {

    const headers = `
    <li
    style="align-content: center; display: flex; justify-content: center; width: 100%; height: 30px; margin-bottom: 20px;">
        <ul
            style="list-style: none; display: flex; border-radius: 25px; justify-content: space-around; align-items: center; width: 100%; box-sizing: border-box; background-color: #eee;">
            <li style="align-items: center; display: flex; justify-content: center; flex: 1;">
                FECHA
            </li>
            <li style="align-items: center; display: flex; justify-content: center; flex: 1;">
                HORA
            </li>
            <li style="align-items: center; display: flex; justify-content: center; flex: 1;">
                ESTUDIANTES
            </li>
        </ul>
    </li>
    `;
  return `
    <div id="calendar-content"> 
    <div
    style="width: 100%; height: 200px; font-family: sans-serif; background-color:  #166484; border-radius: 15px 15px 0 0; display: flex;" >
    <div style="width: 75%; padding-left: 70px;">
        <p style="color: white; font-size: 25px;">
            CALENDARIO DE <span style="color: yellow;">MATRÍCULA</span> <br>
            <span style="color: yellow;">${content.pac} TODAS LAS CARRERAS</span> <br>
        </p>
        <div
            style="width: 200px; background-color: white; height: 40px; border-radius: 20px; display: flex; justify-content: center; align-items: center; color: #166484;">
            A NIVEL NACIONAL
        </div><br>
    </div>
    <div style="width: 25%;">

    </div>
</div>
<div style="width: 100%; font-family: sans-serif; color: #166484; margin-bottom: 90px;">
    <ul style="list-style: none; box-sizing: border-box;">
        
        ${
            content.calendar.map(date=>{
                return `
                ${headers}
                <li style="align-content: center; display: flex; justify-content: center; width: 100%; height:${date.students.split(" ").length > 5 ?date.students.indexOf("EX")==0?"300px;":"150px;":"30px;"} ">
                    <ul
                        style="list-style: none; display: flex; justify-content: space-around; align-items: center; width: 100%; box-sizing: border-box;">
                        <li style="align-items: center; display: flex; justify-content: center; flex: 1;">
                            ${date.date}
                        </li>
                        <li style="align-items: center; display: flex; justify-content: center; flex: 1;">
                            ${date.hour}
                        </li>
                        <li style="align-items: center; display: flex; justify-content: center; flex: 1;">
                            ${date.students}
                        </li>
                    </ul>
                </li>
                `
            })   
        }
    </ul>
</div>
<div style="padding-left: 20px;width: 100%;height:200px">
    <p style="color: #166484;font-size: 20px;">
        Para estudiantes que no se matricularon en el ${content.previousPac}, se les tomará en cuenta el índice <br> del
        último período que estudiaron. <br>

        PAGO EN BANCO del ${content.initDate} al ${content.finalDate} <br>
        Bancos LAFISE, BANPAIS, DAVIVIENDA, FICOHSA Y ATLANTIDA a nivel nacional <br>
        https://pagos.unah.edu.hn para pagos en línea <br>

        ADICIONES Y CANCELACIONES del ${content.aditionInterval} <br>
    </p>
</div>
</div>
    `;
};

module.exports = getCalendarTemplate;
