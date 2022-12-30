module.exports = {
    /**
     * @param sliderFilter.min (for min price)
     * @param sliderFilter.max (for max price)
     * @returns an object query to find a document
     */
    sliderFilterFn: (sliderFilter) => {
        let sliderFilterObj = {};

        if (sliderFilter.min || sliderFilter.max) {
            if (sliderFilter.min) {
                sliderFilterObj = {
                    price: {$gte: sliderFilter.min}
                };
            }
            if (sliderFilter.max) {
                sliderFilterObj = {
                    price: {$lte: sliderFilter.max}
                };
            }
        }
        if (sliderFilter.min && sliderFilter.max) {
            sliderFilterObj = {
                $and: [{
                    price: {$gte: sliderFilter.min}
                }, {
                    price: {$lte: sliderFilter.max}
                }]
            };
        }

        return sliderFilterObj;
    }
}
