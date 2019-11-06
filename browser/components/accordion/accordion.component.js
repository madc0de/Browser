
module.exports.accordionPanel = class extends HTMLElement {
	constructor(){
		super();
		this.addEventListener('click', (e) =>{
			if(e.target.classList.contains('panel')){
				this.showPanel(e.target);
			}
		});
	}
	showPanel(panel){
		//Hide current one. First time it will be null. 
		var expandedPanel = this.querySelector('.active');
		if (expandedPanel){
			expandedPanel.classList.remove('active');
			expandedPanel.setAttribute('active', 'false');
		}
		//Show new one
		panel.classList.add('active');
		panel.setAttribute('active', 'true');
	}
};

module.exports.accordionItem = class extends HTMLElement {
	static get observedAttributes() {
		return ['active'];
	}

	constructor(){
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = `
            <link rel='stylesheet' href='${__dirname}/accordion.component.css' />
            <div class='acc-header'><span class="panTitle"></span></div>
            <div class='acc-body'>
                <slot></slot>
            </div>
        `;
		this.accHeader = this.shadowRoot.querySelector('.acc-header');
		this.accTitle = this.shadowRoot.querySelector('.acc-header .panTitle');
		this.accBody = this.shadowRoot.querySelector('.acc-body');
	}

	connectedCallback(){
		this.classList.add('panel');
		if (this.hasAttribute('active')){
			this.classList.add('active');
			this.accHeader.classList.add('active');
			this.accBody.classList.add('active');
		}
		this.accTitle.textContent = this.hasAttribute('title') ? this.getAttribute('title') : 'Title';
	}

	attributeChangedCallback(attrName, oldVal, newVal){
		switch(attrName){
		case 'active':
			this.accHeader.classList.toggle('active');
			this.accBody.classList.toggle('active');
			break;
		}
	}
};