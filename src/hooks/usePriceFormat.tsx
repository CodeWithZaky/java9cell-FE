const usePriceFormat = () => {
    const numberFormat = (value: any) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);

    return { numberFormat };
};

export default usePriceFormat;
