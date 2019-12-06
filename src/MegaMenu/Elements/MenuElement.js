import BuilderElementBase from './BuilderElementBase'
import MenuItemElement from './MenuItemElement';

export default class MenuElement extends BuilderElementBase
{
    constructor()
    {
        super();
        this.properties = {
            classes: "zama menu",
            prefix: "pehla te da",
            suffix: "bad k te da",
        };
        
    }
    
    createDomElement()
    {
        let element = jQuery("<div>Menu Element</div>");
        return element;
    }
    
    buildPropertiesForm()
    {
        let $form = jQuery(`<div>
        Classes:
        <input name='classes' class='properties-form-element' value='${this.properties.classes}' />
        <br />
        prefix:
        <textarea name='prefix' class='properties-form-element' >${this.properties.prefix}</textarea>
        <br />
        <br />
        suffix:
        <textarea name='suffix' class='properties-form-element' >${this.properties.suffix}</textarea>
        <br />
        </div>`);
        
        return $form;
    }
    
    propertiesFormValuesChange(name, value, element, evt)
    {
        if(this.properties[name])
        {
            this.properties[name] = value;
        }
    }
    
    addMenuItem()
    {
        let menu = this;
        let builder = this.builder;
        return function(evt) {
            //create new menuItemElement
            var menuItemElement = new MenuItemElement();
            //create dom elemment of menu
            var menuItemDomElement = menuItemElement.domElement;
            // console.log(menuItemDomElement, console.log());
            //add refrence to each other
            menuItemElement.domElement = menuItemDomElement;
            menuItemDomElement[0].builderElement = menuItemElement;
            
            //add menuItemElement to builder
            builder.addElement(menuItemElement);
            
            //append menuDom to builder dom
            menu.domElement.append(menuItemDomElement);
        }
    }
    
    buildToolsBar()
    {
        let tools = [];
        tools.push({
            label:'Add Menu Item',
            fn:this.addMenuItem()
        });
        
        
        
        
        return tools;
    }
    
} 