class Markup {
	constructor(text) {
		this.text = text;
	}

	getMarkup() {
		return this.text;
	}
}

class MarkupDecorator extends Markup {
	constructor(newMarkup) {
		super();
		this.tempMarkup = newMarkup;
	}

	getMarkup() {
		return this.tempMarkup.getMarkup();
	}
}

class Div extends MarkupDecorator {
	constructor(newMarkup) {
		super(newMarkup);
	}

	getMarkup() {
		const mk = this.tempMarkup.getMarkup();
		return `<div>${mk}</div>`;
	}
}
const markup = new Div(new Div(new Markup('balls')));

console.log(markup.getMarkup());
