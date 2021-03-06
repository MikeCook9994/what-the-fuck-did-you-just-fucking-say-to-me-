function GetMessages() {
    return document.getElementsByClassName("_58nk"); 
}

function GetCodeSnippets() {
    return document.getElementsByClassName("_wu0"); 
};

function GetEncryptedMessages() {
    return document.getElementsByClassName("enc");
};

function GetDecryptedMessages() {
    return document.getElementsByClassName("dec"); 
};

function GetuserName() {
    let profileURL = document.querySelectorAll("a._3oh-").innerHTML;
    return profileURL.substr(profileURL.lastIndexOf('/') + 1);
}

function GetName() {
    return document.querySelectorAll("div._3eur")[0].children[0].innerHTML;
}

function AddEncryptClassTag(callback) {
    let codeSnippets = GetCodeSnippets();
    for(let message of codeSnippets) {
        let element = message.children[0]
        if(!element.className.includes("enc") && element.innerHTML.includes("-----BEGIN PGP MESSAGE-----")) {
            element.className += " enc";      
        }
    }

    let messages = GetMessages();
    for(let message of messages) {
        if(!message.className.includes("enc") && message.innerHTML.includes("-----BEGIN PGP MESSAGE-----")) {
            message.className += " enc";      
        }
    }

    callback();
}

setTimeout(function() {
    let numMessages = GetMessages().length + GetCodeSnippets().length;
    setInterval(function() {
        if(numMessages >= GetMessages().length + GetCodeSnippets().length) {
            AddEncryptClassTag(function() {
                let decryptedMessages = GetEncryptedMessages();
                numMessages = decryptedMessages.length;
                for(let message of decryptedMessages) {
                    chrome.runtime.sendMessage({message: message.innerHTML}, function(response) {
                        console.log(response);
                        message.innerHTML = response.message;
                    });
                }
            });
        }
    }, 1000);
}, 3000);
