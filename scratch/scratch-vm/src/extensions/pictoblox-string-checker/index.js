const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

class PictoBloxStringChecker {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo (){
        return {
            id: 'pictobloxString',
            name: 'PictoBlox String',
            blocks: [
                {
                    opcode: 'wasSentBefore',
                    blockType: BlockType.BOOLEAN,
                    text: 'enter a string [STRING1]',
                    arguments: {
                        STRING1: {
                            type: ArgumentType.STRING,
                            defaultValue: 'hello world'
                        }
                    }
                }
            ]
        };
    }

    async wasSentBefore (args) {
        const {STRING1} = args;
        try {
            const res = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({string: STRING1})
            });
            if (!res.ok){
                const {message} = await res.json();
                throw new Error(message);
            }
            const {present} = await res.json();
            return present === 1;
        } catch (e){
            console.log(e.message);
        }
    }
}

module.exports = PictoBloxStringChecker;
