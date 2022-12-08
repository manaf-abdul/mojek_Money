export const calculateSIP = async (req, res) => {
    try {
        let { amount, compoundRate,duration,returnRate } = req.body;
       
        let calculatedValue=Math.floor(amount * (Math.pow((1+compoundRate),duration)-1) * ((1+compoundRate)/compoundRate))
        
        res.json({
            return:calculatedValue,
            invested_amount:calculatedValue,
            total_value:calculatedValue+calculatedValue
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error",error)
    }
}