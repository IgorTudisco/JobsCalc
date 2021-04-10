// A pasta Utils fica responsável por todo serviço necessário para o nosso programa.

/*
    O services que estáva dentro do objeto job foi transferido parao arquvo jobUtils.
    Aqui o mesmo vira module.exports.
    E assim o mesmo já está abilitado para exportação.
*/

module.exports = {
            
    // Função para calculo de data.

    remainingDays(job) {
                        
        // Ajustando o job.
        // Calculo de tempo restante.

        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

        const createdDate = new Date(job.created_at);

        const dueDay = createdDate.getDate() + Number(remainingDays);
        
        const dueDateInMs = createdDate.setDate(dueDay);

        // Tempo restante.

        const timeDiffInMs = dueDateInMs - Date.now();

        // Transformando milli segundos em days.

        const dayInMs = 1000 * 60 * 60 * 24;

        // O Math.floor() vai arredondar para baixo.
        // Mudando de Math.floor() para Math.ceil(). Assim vamos corrigir um bag de tempo.
        // O Math.ceil() vai arredondar para cima. Assim temos tempo para terminar alguma aplicação.

        const dayDiff = Math.ceil(timeDiffInMs / dayInMs);
        
        // restam x days
        
        return dayDiff;
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}