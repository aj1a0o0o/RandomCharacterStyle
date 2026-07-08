 /*
------------------------------------------------------------
Random Character Style
UI_StyleRow.jsx

负责创建一行字符样式设置

Adobe InDesign ExtendScript ES3

Author : aj1a0o0o
Version : 1.0
------------------------------------------------------------
*/

if (typeof UI === "undefined")
{
    throw new Error("UI_Config.jsx must be loaded first.");
}

//==================================================
// StyleRow
//==================================================

UI.StyleRow = function(parent)
{
    this.parent = parent;

    this.group = null;

    this.styleDropdown = null;

    this.probabilityEdit = null;

    this.removeButton = null;

    this.addButton = null;

 //--------------------------------------------------
// Events
//--------------------------------------------------

this.onAdd = null;

this.onRemove = null;

this.onChanged = null;
 
};


//==================================================
// Create
//==================================================

UI.StyleRow.prototype.create = function()
{
    this.group = this.parent.add("group");

    this.group.orientation = "row";

    this.group.alignChildren = ["left","center"];

    this.group.spacing = UI.SPACING;

    this.group.margins = 0;

    //------------------------------------------
    // Style
    //------------------------------------------

    this.createDropdown();

    //------------------------------------------
    // Probability
    //------------------------------------------

    this.createProbabilityEdit();

    //------------------------------------------
    // Remove
    //------------------------------------------

    this.removeButton = this.group.add(
        "button",
        undefined,
        UI.STRING.REMOVE
    );

    this.removeButton.preferredSize.width =
        UI.BUTTON_SIZE;

    //------------------------------------------
    // Add
    //------------------------------------------

    this.addButton = this.group.add(
        "button",
        undefined,
        UI.STRING.ADD
    );

    this.addButton.preferredSize.width =
        UI.BUTTON_SIZE;

//--------------------------------------------------
// Events
//--------------------------------------------------

var self = this;

this.addButton.onClick = function()
{
    if(self.onAdd != null)
    {
        self.onAdd(self);
    }
};

this.removeButton.onClick = function()
{
    if(self.onRemove != null)
    {
        self.onRemove(self);
    }
};

this.styleDropdown.onChange = function()
{
    if(self.onChanged != null)
    {
        self.onChanged(self);
    }
};

this.probabilityEdit.onChange = function()
{
    self.validateProbability();

    if(self.onChanged != null)
    {
        self.onChanged(self);
    }
};
 
    return this.group;
};


//==================================================
// Dropdown
//==================================================

UI.StyleRow.prototype.createDropdown =
function()
{
var list = UI.getCharacterStyleNames(app.activeDocument);

this.styleDropdown =
    this.group.add(
        "dropdownlist",
        undefined,
        list
    );

    this.styleDropdown.preferredSize.width =
        UI.STYLE_WIDTH;

    if(this.styleDropdown.items.length > 0)
    {
        this.styleDropdown.selection = 0;
    }
};


//==================================================
// Probability
//==================================================

UI.StyleRow.prototype.createProbabilityEdit =
function()
{
    this.probabilityEdit =
        this.group.add(
            "edittext",
            undefined,
            UI.DEFAULT_PROBABILITY
        );

    this.probabilityEdit.characters = 6;

    this.probabilityEdit.preferredSize.width =
        UI.PROBABILITY_WIDTH;

    this.probabilityEdit.justify = "center";
};


//==================================================
// Enable
//==================================================

UI.StyleRow.prototype.enable =
function()
{
    this.styleDropdown.enabled = true;

    this.probabilityEdit.enabled = true;

    this.removeButton.enabled = true;

    this.addButton.enabled = true;
};


//==================================================
// Disable
//==================================================

UI.StyleRow.prototype.disable =
function()
{
    this.styleDropdown.enabled = false;

    this.probabilityEdit.enabled = false;

    this.removeButton.enabled = false;

    this.addButton.enabled = false;
};
//==================================================
// Get Style
//==================================================

UI.StyleRow.prototype.getStyle =
function()
{
    if(!this.styleDropdown)
    {
        return "";
    }

    if(this.styleDropdown.selection == null)
    {
        return "";
    }

    return this.styleDropdown.selection.text;
};


//==================================================
// Set Style
//==================================================

UI.StyleRow.prototype.setStyle =
function(styleName)
{
    var i;

    if(!this.styleDropdown)
    {
        return;
    }

    for(i = 0; i < this.styleDropdown.items.length; i++)
    {
        if(this.styleDropdown.items[i].text == styleName)
        {
            this.styleDropdown.selection = i;
            return;
        }
    }
};


//==================================================
// Get Probability
//==================================================

UI.StyleRow.prototype.getProbability =
function()
{
    var value;

    value = parseFloat(
        this.probabilityEdit.text
    );

    if(isNaN(value))
    {
        return 0;
    }

    if(value < 0)
    {
        value = 0;
    }

    if(value > 1)
    {
        value = 1;
    }

    return value;
};


//==================================================
// Set Probability
//==================================================

UI.StyleRow.prototype.setProbability =
function(value)
{
    if(value == undefined)
    {
        value = 0;
    }

    if(isNaN(value))
    {
        value = 0;
    }

    if(value < 0)
    {
        value = 0;
    }

    if(value > 1)
    {
        value = 1;
    }

var txt = value.toString();

if(txt.indexOf(".") >= 0)
{
    while(txt.charAt(txt.length - 1) == "0")
    {
        txt = txt.substring(0, txt.length - 1);
    }

    if(txt.charAt(txt.length - 1) == ".")
    {
        txt = txt.substring(0, txt.length - 1);
    }
}

this.probabilityEdit.text = txt;
 
};


//==================================================
// Validate Probability
//==================================================

UI.StyleRow.prototype.validateProbability =
function()
{
    var txt;

    var value;

    txt = this.probabilityEdit.text;

    txt = txt.replace(",", ".");

    value = parseFloat(txt);

if(isNaN(value))
{
    this.probabilityEdit.text = "0";
    return false;
}

if(value < 0)
{
    value = 0;
}

if(value > 1)
{
    value = 1;
}

txt = value.toString();

if(txt.indexOf(".") >= 0)
{
    while(txt.charAt(txt.length - 1) == "0")
    {
        txt = txt.substring(0, txt.length - 1);
    }

    if(txt.charAt(txt.length - 1) == ".")
    {
        txt = txt.substring(0, txt.length - 1);
    }
}

this.probabilityEdit.text = txt;

return true;
};


//==================================================
// Get Data
//==================================================

UI.StyleRow.prototype.getData =
function()
{
    var data = {};

    data.style =
        this.getStyle();

    data.probability =
        this.getProbability();

    return data;
};


//==================================================
// Set Data
//==================================================

UI.StyleRow.prototype.setData =
function(data)
{
    if(data == null)
    {
        return;
    }

    if(data.style != undefined)
    {
        this.setStyle(data.style);
    }

    if(data.probability != undefined)
    {
        this.setProbability(
            data.probability
        );
    }
};


//==================================================
// Reset
//==================================================

UI.StyleRow.prototype.reset =
function()
{
    if(this.styleDropdown.items.length > 0)
    {
        this.styleDropdown.selection = 0;
    }

    this.probabilityEdit.text =
        UI.DEFAULT_PROBABILITY;
};
//==================================================
// Show Add Button
//==================================================

UI.StyleRow.prototype.showAddButton =
function()
{
    if(this.addButton)
    {
        this.addButton.visible = true;
        this.addButton.enabled = true;
    }
};


//==================================================
// Hide Add Button
//==================================================

UI.StyleRow.prototype.hideAddButton =
function()
{
    if(this.addButton)
    {
        this.addButton.visible = false;
        this.addButton.enabled = false;
    }
};


//==================================================
// Show Remove Button
//==================================================

UI.StyleRow.prototype.showRemoveButton =
function()
{
    if(this.removeButton)
    {
        this.removeButton.visible = true;
        this.removeButton.enabled = true;
    }
};


//==================================================
// Hide Remove Button
//==================================================

UI.StyleRow.prototype.hideRemoveButton =
function()
{
    if(this.removeButton)
    {
        this.removeButton.visible = false;
        this.removeButton.enabled = false;
    }
};


//==================================================
// Set Add Button Visible
//==================================================

UI.StyleRow.prototype.setAddButtonVisible =
function(flag)
{
    if(flag)
    {
        this.showAddButton();
    }
    else
    {
        this.hideAddButton();
    }
};


//==================================================
// Set Remove Button Visible
//==================================================

UI.StyleRow.prototype.setRemoveButtonVisible =
function(flag)
{
    if(flag)
    {
        this.showRemoveButton();
    }
    else
    {
        this.hideRemoveButton();
    }
};


//==================================================
// Focus Probability
//==================================================

UI.StyleRow.prototype.focusProbability =
function()
{
    if(this.probabilityEdit)
    {
        this.probabilityEdit.active = true;
    }
};


//==================================================
// Remove Row
//==================================================

UI.StyleRow.prototype.remove =
function()
{
    if(this.group)
    {
if(this.group.parent)
{
    this.group.parent.remove(this.group);
}
        this.group = null;
    }
};


//==================================================
// Destroy
//==================================================

UI.StyleRow.prototype.destroy =
function()
{
    this.group = null;

    this.styleDropdown = null;

    this.probabilityEdit = null;

    this.removeButton = null;

    this.addButton = null;

    this.parent = null;

this.onAdd = null;

this.onRemove = null;

this.onChanged = null;
 
};

//==================================================
// Is Alive
//==================================================

UI.StyleRow.prototype.isAlive =
function()
{
    return this.group != null;
};

//==================================================
// Is Valid
//==================================================

UI.StyleRow.prototype.isValid =
function()
{
    if(this.group == null)
    {
        return false;
    }

    if(this.styleDropdown == null)
    {
        return false;
    }

    if(this.probabilityEdit == null)
    {
        return false;
    }

    return true;
};


//==================================================
// Refresh
//==================================================

UI.StyleRow.prototype.refresh =
function()
{
    if(this.group)
    {
        this.group.layout.layout(true);
    }
};


//==================================================
// Debug
//==================================================

UI.StyleRow.prototype.toString =
function()
{
    return "[StyleRow] "
        + this.getStyle()
        + " : "
        + this.getProbability();
};
