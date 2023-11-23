export default class FormDataBuilder {
    constructor() {
      this._inputsData = [];
    }
    /**
     * 
     * @param {string} id 
     * @param {string} value 
     */
    addData(id, value) {
        this._inputsData.push([id, value]);
        return this;
    }

    get lastInputData() {
        if (this._inputsData.length <= 0)
            return null;
        const toReturn = this._inputsData[this._inputsData.length - 1];
        this._inputsData.pop(this._inputsData.length - 1);
        return toReturn;
    }
}