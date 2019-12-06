var builder = null;

export default function createBuilder()
{
    if(!builder)
    {
        builder = new Builder();
    }
    return builder;
}
class Builder
{
    constructor()
    {
        this.builderElements = {};
        this.elementId = 10;
        this.toolBar = null;
        this.propertiesPanel = null;
        this.domElement = null;
        //jQuery hoverElement
        this.hoverElement = null;
        //jQuery activeElement
        this.activeElement = null;
        
        //toolTip like element of top of active or hovered elements
        this.hoverTools = null;
        this.activeTools = null;
        
        this.propertiesPanelValuesChanged = false;
        
        this.createBuilderMarkup();
    }
    
    onElementHover()
    {
        let builder = this;
        return function(evt){
            //on hover add hover class and hoverToolTip
            evt.stopImmediatePropagation();
            let $hoverElement = jQuery(this);
            jQuery(builder.domElement).find('.builder-hover').removeClass('builder-hover');
            $hoverElement.addClass('builder-hover');
            if(!builder.activeElement || $hoverElement[0] != builder.activeElement[0])
            {
                $hoverElement.wrap("<div class='toolTip-parent'></div>");
                $hoverElement.parent().prepend(builder.hoverTools);
            }
        }
        
    }
    
    onElementHoverEnd()
    {
        let builder = this;
        return function(evt){
            let $hoverElement = jQuery(this);
            evt.stopImmediatePropagation();
            $hoverElement.removeClass('builder-hover');
            if(!builder.activeElement || builder.activeElement[0] !== $hoverElement[0])
            {
                $hoverElement.unwrap(".toolTip-parent");
            }
            builder.hoverTools.remove();
            
        }
    }
    
    
    onElementClick()
    {
        let builder = this;
        
        return function(evt){
            evt.preventDefault();
            evt.stopImmediatePropagation();
            if(builder.activeElement)
            {
                builder.activeElement.removeClass('builder-active');
                builder.activeElement.unwrap(".toolTip-parent");
            }
            
            builder.activeElement = jQuery(this);
            if(!builder.activeElement.closest(".toolTip-parent").length)
            {
                builder.activeElement.wrap("<div class='toolTip-parent'></div>");
            }
            builder.activeTools.html('<span class="element-name">'+builder.activeElement[0].builderElement.constructor.name+'</span>');
            builder.activeElement.parent().prepend(builder.activeTools);
            builder.activeElement.addClass('builder-active');
            builder.hoverTools.remove();
            
            let toolsBarTools = builder.activeElement[0].builderElement.buildToolsBar();
            builder.toolBar.html("");
            toolsBarTools.forEach(function(e, i){
                let $li = jQuery("<li><a href='#'>"+e.label+"</a></li>");
                let $a = $li.find("a");
                $a.on("click", e.fn);
                
                builder.toolBar.append($li);
            });
            
            
            let $form = builder.propertiesPanel.find(".builder-properties-form");
            $form.find('.builder-properties-form-elements').html('');
            $form.find('.builder-properties-form-elements').append(builder.activeElement[0].builderElement.buildPropertiesForm());
            
            
            //on change of any field
            $form.find('.properties-form-element').on('input', function(evt){
                evt.preventDefault();
                let element = this;
                let name = element.name;
                let value = element.value;
                builder.activeElement[0].builderElement.propertiesFormValuesChange(name, value, element, evt);
            });
            builder.propertiesPanel.show();
            
        }
    }
    
    
    createBuilderMarkup()
    {
        let builder = this;
        builder.hoverTools = jQuery('<div class="builder-hovertools">HoverTools</div>');
        builder.activeTools = jQuery('<div class="builder-activetools">Active Tools</div>');
        builder.domElement = jQuery('<div class="builder">Builder<div class="builder-header"><div class="builder-navbar navbar navbar-inverse">Navbar</div></div><div class="builder-content"></div></div>');
        builder.toolBar = jQuery('<ul class="builder-toolbar navbar-nav nav"><li><a href="">Select Something</a></li></ul>');
        builder.toolBar.on('click', 'a', function(event){
            event.preventDefault();
        });
        
        builder.domElement.find('.builder-content').on('mouseenter', '.builder-element', builder.onElementHover());
        builder.domElement.find('.builder-content').on('mouseleave', '.builder-element', builder.onElementHoverEnd());
        builder.domElement.find('.builder-content').on('click', '.builder-element', builder.onElementClick());
        builder.domElement.find('.builder-content').on('click', function(evt){
            evt.preventDefault();
            evt.stopImmediatePropagation();
            if(builder.activeElement)
            {
                builder.activeElement.removeClass('builder-active');
                builder.activeElement.unwrap(".toolTip-parent");
                builder.activeElement = null;
                builder.propertiesPanel.hide();
                
            }
        });
        // builder.propertiesPanel = jQuery('<div class="builder-properties panel panel-default">Properties <form class="builder-properties-form"><div class="builder-properties-form-elements"></div></form></div>');
        builder.propertiesPanel = jQuery(`<div class=" builder-properties  panel panel-default">
        <form class="builder-properties-form">
        <div class="panel-heading">
        <h3 class="panel-title">Panel title</h3>
        </div>
        <div class="panel-body">
        <div class="builder-properties-form-elements"></div>
        </div>
        </form>
        </div>`);
        
        let $form = builder.propertiesPanel.find(".builder-properties-form");
        builder.propertiesPanel.hide();
        // let $submit = jQuery('<input type="submit" name="op" class="builder-properties-form-submit" value="Save"/>');
        // $form.find('.panel-footer').append($submit);
        //prevent form from submiting
        $form.on('submit', function(evt){
            evt.preventDefault();
        });
        
        
        builder.domElement.append(builder.propertiesPanel);
        builder.domElement.find('.builder-navbar').append(builder.toolBar);
    }
    
    buildId()
    {
        return '_' + ((this.elementId)/++this.elementId).toString(36).substr(2);
    }
    // builderElement: object of BuilderElementBase
    // domObject: jQuery dom object
    addElement(builderElement)
    {
        if(!builderElement.domElement)
        {
            throw new Error("You must add refrence from builderElement to it's domElement");
        }
        const id = this.buildId();
        builderElement.builder = this;
        builderElement.domElement.attr("builder-id", id).addClass('builder-element');
        builderElement.id = id;
        this.builderElements[id]  = ({builderElement, id});
    }
}