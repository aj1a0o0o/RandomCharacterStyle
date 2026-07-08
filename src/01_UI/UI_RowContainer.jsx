/*
------------------------------------------------------------
Random Character Style
UI_RowContainer.jsx

负责管理所有 StyleRow

Adobe InDesign ExtendScript ES3

Author : Lya Peng
Version : 1.0
------------------------------------------------------------
*/

if (typeof UI === "undefined")
{
    throw new Error("UI_Config.jsx must be loaded first.");
}

if (typeof UI.StyleRow === "undefined")
{
    throw new Error("UI_StyleRow.jsx must be loaded first.");
}

//==================================================
// Constructor
//==================================================

UI.RowContainer = function(parent)
{
    this.parent = parent;

    this.group = null;

    this.rows = [];

    // Event Callback
    this.onRowAdded = null;
    this.onRowRemoved = null;
    this.onChanged = null;
};

//==================================================
// Create
//==================================================

UI.RowContainer.prototype.create =
function()
{
    this.group = this.parent.add("group");

    this.group.orientation = "column";

    this.group.alignChildren = "fill";

    this.group.spacing = UI.SPACING;

    this.group.margins = 0;

    this.createDefaultRows();

    return this.group;
};

//==================================================
// Create Default Rows
//==================================================

UI.RowContainer.prototype.createDefaultRows =
function()
{
    var i;

    for(i = 0; i < UI.MIN_ROWS; i++)
    {
        this.addRow(false);
    }

    this.refreshButtons();
};

//==================================================
// Add Row
//==================================================

UI.RowContainer.prototype.addRow =
function(refresh)
{
    var row;

    if(this.rows.length >= UI.MAX_ROWS)
    {
        return null;
    }

    row = new UI.StyleRow(this.group);

    row.create();

    this.rows.push(row);

    if(refresh !== false)
    {
        this.refreshButtons();

        this.refreshLayout();
    }

    if(this.onRowAdded != null)
    {
        this.onRowAdded(row);
    }

    return row;
};

//==================================================
// Remove Row
//==================================================

UI.RowContainer.prototype.removeRow =
function(index)
{
    if(index < 0)
    {
        return;
    }

    if(index >= this.rows.length)
    {
        return;
    }

    if(this.rows.length <= UI.MIN_ROWS)
    {
        return;
    }

    this.rows[index].remove();

    this.rows[index].destroy();

    this.rows.splice(index, 1);

    this.refreshButtons();

    this.refreshLayout();

    if(this.onRowRemoved != null)
    {
        this.onRowRemoved(index);
    }
};

//==================================================
// Refresh Buttons
//==================================================

UI.RowContainer.prototype.refreshButtons =
function()
{
    var i;

    for(i = 0; i < this.rows.length; i++)
    {
        //------------------------------------------
        // Add Button
        //------------------------------------------

        if(i == this.rows.length - 1)
        {
            if(this.rows.length < UI.MAX_ROWS)
            {
                this.rows[i].showAddButton();
            }
            else
            {
                this.rows[i].hideAddButton();
            }
        }
        else
        {
            this.rows[i].hideAddButton();
        }

        //------------------------------------------
        // Remove Button
        //------------------------------------------

        if(this.rows.length > UI.MIN_ROWS)
        {
            this.rows[i].showRemoveButton();
        }
        else
        {
            this.rows[i].hideRemoveButton();
        }
    }
};

//==================================================
// Refresh Layout
//==================================================

UI.RowContainer.prototype.refreshLayout =
function()
{
    if(this.group)
    {
        this.group.layout.layout(true);

        this.group.layout.resize();
    }
};
