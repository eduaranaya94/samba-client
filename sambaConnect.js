const cliente = require('samba-client');
const fs = require('fs');

class SambaClient {
    constructor(serverShareFolder) {
        this.Samba = new cliente({
            address: serverShareFolder, // required
            username: 'test', // not required, defaults to guest
            password: 'test', // not required
            domain: 'WORKGROUP', // not required
            maxProtocol: 'SMB3' // not required
        });
    }

    /**
     * Valida si el nombre enviado como arguemento existe en la carpeta remota.
     * @param {*} fileRemoteName nombre de archivo a validar.
     */
    async FileExists(fileRemoteName) {
        return await this.Samba.fileExists(fileRemoteName)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    /**
     * Toma un archivo de la carpeta remota y copia al servidor local.
     * @param {*} fileRemoteName Nombre del archivo a obtener.
     * @param {*} localPathToSave
     */
    async GetFile(fileRemoteName, localPathToSave) {
        let existe = await this.FileExists(localPathToSave);
        if (!existe) {
            fs.mkdir(localPathToSave, { recursive: true }, err => { });
        }

        await this.Samba.getFile(fileRemoteName, `${localPathToSave}${fileRemoteName}`);
    }

    /**
     * Envia un archivo del servidor local a una carpeta remota.
     * @param {*} localFilePathToSend 
     */
    async SendFile(localFilePathToSend) {
        await this.Samba.sendFile(localFilePathToSend, "");
    }
}

module.exports = {
    SambaClient
}
