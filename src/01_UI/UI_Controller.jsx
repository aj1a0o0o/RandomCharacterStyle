/*
------------------------------------------------------------
Random Character Style

UI_Controller.jsx

负责整个 UI 的业务逻辑

Author : Lya Peng
Version : 1.0
------------------------------------------------------------
*/

if (typeof UI === "undefined")
{
    throw new Error("UI_Config.jsx 必须先加载。");
}

//==================================================
// Constructor
//==================================================

UI.Controller = function ()
{
    this.window = null;

    this.container = null;

    this.isRunning = false;
};

//==================================================
// Create
//==================================================

UI.Controller.prototype.create =
function ()
{
    this.window = new UI.Window();

    this.window.create();

    this.container =
        this.window.getRowContainer();

    this.bindEvents();

    this.refresh();

    return this.window;
};

//==================================================
// Show
//==================================================

UI.Controller.prototype.show =
function ()
{
    return this.window.show();
};

//==================================================
// Bind Events
//==================================================

UI.Controller.prototype.bindEvents =
function ()
{
    var self = this;

    //--------------------------------------------------
    // Container Changed
    //--------------------------------------------------

    this.container.onChanged =
    function ()
    {
        self.refresh();
    };

    //--------------------------------------------------
    // Total Changed
    //--------------------------------------------------

    this.container.onTotalChanged =
    function (total)
    {
        self.window.setTotal(total);

        self.updateOKButton(total);
    };

    //--------------------------------------------------
    // OK
    //--------------------------------------------------

    this.window.okButton.onClick =
    function ()
    {
        self.apply();
    };

    //--------------------------------------------------
    // Cancel
    //--------------------------------------------------

    this.window.cancelButton.onClick =
    function ()
    {
        self.window.close();
    };
};

//==================================================
// Refresh
//==================================================

UI.Controller.prototype.refresh =
function ()
{
    var total;

    total =
        this.container.getTotalProbability();

    this.window.setTotal(total);

    this.updateOKButton(total);

    this.window.refresh();
};

//==================================================
// Update OK Button
//==================================================

UI.Controller.prototype.updateOKButton =
function (total)
{
    if(total <= 1)
    {
        this.window.enableOK();
    }
    else
    {
        this.window.disableOK();
    }
};

//==================================================
// Get Scope
//==================================================

UI.Controller.prototype.getScope =
function ()
{
    return this.window.getScope();
};
