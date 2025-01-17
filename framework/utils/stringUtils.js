class StringUtils{

	static deleteSpaces(text) {
		return text.replace(/\s/g, '');
	}

	static getNumberOfString(text){
		const textWithoutSpaces = this.deleteSpaces(text);
		const matches = textWithoutSpaces.match(/[-]?\d+/g);
		if (matches === null) {
			throw new SyntaxError(`There are no number matches in ${text} string`);
		}
		return Number(matches[0]);
	}
	static format(string, word) {
		let formatted = string.replace(`{0}`, word);
		return formatted;
	  }
}

module.exports = StringUtils;