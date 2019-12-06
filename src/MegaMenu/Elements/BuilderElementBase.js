export default class BuilderElementBase
{
    constructor(builder)
    {
        this.id = null;
        this.properties = {};
        this.domElement = this.createDomElement();
        if(!(this.domElement instanceof jQuery.fn.init))
        {
            throw new Error("The createDomElement must return jQuery object in "+this.constructor.name);
        }
        //array of child elements ids
        this.builderElements = [];
    }

    getMachineName()
    {
        
    }

    //return array of {label, fn}
    buildToolsBar()
    {
        return [];
    }
    
    
    propertiesFormValuesChange(name, value, element, evt)
    {
        alert("Implement propertiesFormValuesChange in your builderElement");
    }
    
    hoverTools()
    {
        return jQuery("<span>Hover tools of element</span>");
    }

    createDomElement()
    {
        return jQuery();
    }
    
    //reutrn jQuery object
    buildPropertiesForm()
    {
        return jQuery('You must implement buildPropertiesForm method in your BuilderELementClass');
    }
}