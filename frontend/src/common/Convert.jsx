const IndianFormattedNumber = ({ number }) => {
    const indianFormattedNumber = new Intl.NumberFormat("en-IN").format(number);
  
    return indianFormattedNumber
  };
  
  export default IndianFormattedNumber;