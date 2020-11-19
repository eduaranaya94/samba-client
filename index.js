const { SambaClient } = require('./sambaConnect');

async function inicio() {
    try {
        await new SambaClient('//192.168.1.1/destino').GetFile('pdf.pdf', '/tmp/eduar/otra/');
    } catch (error) {
        console.log(error.message);
    }
}
inicio()