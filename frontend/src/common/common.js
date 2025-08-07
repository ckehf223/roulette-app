const Modalsm = function(message,title,callback,options){
    if(self != top) {
        window.parent.Ustra.modal(message, title, callback,options);
        return;
    }

    if(isFunction(title)){
        callback = title;
        title = undefined;
    }

    var defaultTemplates = {
        templates:{
            container:'<div class="modal is-small" tabindex="-1" role="alert"></div>',
            dialog: '<div class="card"></div>',
            header: '<div class="card-header is-alert is-horizontal"></div>',
            body: '<div class="card-body"></div>',
            footer: '<div class="card-footer"></div>',
        },
        headerClose:true,
        title:`<p class="card-title">${title||""}&nbsp;</p>`,
        content: '<p class="card-alert-text">' + message+'</p>',
        backdrop: false,
    };

    var modal = new window.Modal(defaultTemplates).show();

    var defaultOptions = {
        btnClassName:'buttons is-center',
        width:356,
        buttons:[
            {
                text: "확인",
                class: "button is-filled is-primary is-medium focus",
                click: function() {
                    if(isFunction(callback)){
                        callback(true);
                    }
                    modal.hide();
                }
            },
        ],

    };

    if(options && options.isConfirm){
        let isFalseCallback = options.isFalseCallback;
        let callback = options.callback;
        var btnOptions = {
            buttons:[
                {
                    text: "취소",
                    class: "button is-outline is-secondary is-medium",
                    click: function() {
                        if (typeof isFalseCallback != "undefined") {
                            if (isFunction(isFalseCallback)) {
                                isFalseCallback(true);
                            } else {
                                isFalseCallback(false);
                            }
                        }
                        modal.hide();
                    }
                },
                {
                    text: "확인",
                    class: "button is-filled is-primary is-medium focus",
                    click: function() {
                        callback(true);
                        modal.hide();
                    }
                }
            ],
        }
        defaultOptions = {
            ... defaultOptions,
            ...btnOptions
        }
    }

    setTimeout(() => {
        modal.el?.querySelector('.card-footer .button.focus');
    }, 10);

    configureModal(modal,defaultOptions);

}

function configureModal(modal, options) {
    if(options.title){
        modal._html.header.querySelector(".card-title").innerText = options.title;
    }

    modal._html.dialog.style.width = !isNaN(parseInt(options.width, 10)) ? `${parseInt(options.width, 10)}px` : options.width || "500px";

    modal._html.dialog.style.height = !isNaN(parseInt(options.height, 10)) ? `${parseInt(options.height, 10)}px` : options.height || "";

    modal._html.footer.innerHTML = "";
    const buttons = Array.isArray(options.buttons) ? options.buttons : [];
    const wrapper = document.createElement("div");
    wrapper.className = options.btnClassName||"buttons is-right";

    buttons.forEach((button) => {
        let buttonElement = document.createElement("button");
        buttonElement.innerHTML = button.text ?? "button";
        buttonElement.setAttribute("type", "button");

        if (button.id) {
            buttonElement.id = button.id;
        }

        if (button.class) {
            buttonElement.classList.add(...button.class.split(" "));
        }

        if (typeof button.click === "function") {
            buttonElement.addEventListener("click", button.click);
        }

        wrapper.appendChild(buttonElement);
    });

    modal._html.footer.appendChild(wrapper);

    return modal;
}


export const showConfirm = (message, title = "확인", onConfirm, onCancel) => {
  if (window.$ && typeof window.$.confirm === "function") {
    Modalsm(message, title, onConfirm, onCancel);
  } else {
    console.error("$.confirm is not available.");
  }
};

export const showAlert = (message, title = "알림", callback) => {
  if (window.$ && typeof window.$.alert === "function") {
    Modalsm(message, title, callback);
  } else {
    console.error("$.alert is not available.");
  }
};

export const showError = (message, title = "오류", callback) => {
  if (window.$ && typeof window.$.error === "function") {
    Modalsm(message, title, callback);
  } else {
    console.error("$.error is not available.");
  }
};

const isFunction = (obj)=>{
return typeof obj === "function" &&
        typeof obj.nodeType !== "number" &&
        typeof obj.item !== "function";
}

function camelCase(str = "") {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, c => c.toLowerCase());
}

