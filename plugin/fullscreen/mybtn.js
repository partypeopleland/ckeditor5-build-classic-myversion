import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
    

export default class MyBtn extends Plugin {

    static get pluginName() {
        return 'myBtn';
    }

    init() {
        this._defineSchema()
        this._defineConverters();
        
        const editor = this.editor;
        const t = editor.t;
        
        editor.ui.componentFactory.add( 'myBtn', locale => {
            const view = new ButtonView( locale );
            
            // 建立一個按鈕
            view.set( {
                label: t( 'My BTN' ),
                withText: true,
                tooltip: true
            } );
            
            // 點擊按鈕的事件
            view.on( 'execute', () => {
                console.log('my btn')

                editor.model.change( writer => {
                    const imageElement = writer.createElement( 'my-btn' )
                    editor.model.insertContent( imageElement, editor.model.document.selection );
                } );
            });

            return view;
        } );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('my-btn', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        });
    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.elementToElement({
            model: 'my-btn',
            view: {
                name: 'input',
                classes: '',
                attributes: {
                    'value': 'Copy',
                    'type': 'button'
                }
            }
        });
    }
}