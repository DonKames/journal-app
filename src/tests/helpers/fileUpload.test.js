import { fileUpload } from "../../helpers/fileUpload";

describe('Pruebas en helper "fileUpload"', () => {

    test('Debe cargar un archivo y retornar el URL', async () => {

        const resp = await fetch('https://www.online-image-editor.com/styles/2019/images/power_girl.png');
        const blob = await resp.blob();

        const file = new File( [blob], 'foto.png' );
        const url = await fileUpload( file );

        console.log( url );
        expect( typeof url ).toBe( 'string' );
    });


    test('Debe cargar un archivo y retornar null', async () => {

        const file = new File( [], 'foto.png' );
        const url = await fileUpload( file );

        expect( url ).toBe( null );

    })
});