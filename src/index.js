import createBuilder from 'MegaMenu/Builder';
import MenuElement from './MegaMenu/Elements/MenuElement';
import "main.css";

//create builder
var builder = createBuilder();
//export builder to window
window.builder = builder;

//create initial menuElement
var menuElement = new MenuElement();
//create dom elemment of menu
var menuDomElement = menuElement.domElement;
//add refrence to each other
menuElement.domElement = menuDomElement;
menuDomElement[0].builderElement = menuElement;

//add menuElement to builder
builder.addElement(menuElement);

//append menuDom to builder dom
builder.domElement.find('.builder-content').append(menuDomElement);

//add builder element to body
jQuery('#builder-container').append(builder.domElement);