export const calculateSIP = async (req, res) => {
    try {
        const { amount, compundRate,duration,returnRate } = req.body;
        let futureValue=amount*[(1+compundRate)^duration-1]*(1+compundRate)/compundRate;

        res.json({
            return:futureValue,
            invested_amount:futureValue,
            Total_value:futureValue+returnRate
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error",error)
    }
}