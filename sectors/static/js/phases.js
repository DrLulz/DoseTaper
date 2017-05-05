$(function() {
    
    $('#add').click( function () {
        console.log('hello');
        var newid = 1;
        $.each($('.phase'), function() {
            if (parseInt($(this).data('id')) > newid) {
                newid = parseInt($(this).data('id'));
            }
        });
        newid++;

        console.log(newid);
    /* 
        var $phase = $("<div></div>", {
            id: "p"+newid,
            "data-id": newid,
            "class": "row phase col-sm-10 col-sm-offset-1"
        });


        var p_head = $("<div class='col-sm-4 col-phase'><div class='row'><span class='title col-sm-4'>Phase " + newid + "</span><span class='values col-sm-7'><span id='p" + newid + "_dose_h'>0 mg</span>  x  <span id='p" + newid + "_days_h'>0 days</span></span></div></div>");
        p_head.appendTo($phase);

        if ($("#toggle_slider").prop("checked") == true) {
            var dose_slide = '';
            var days_slide = '';
            var dose_input = ' hidden';
            var days_input = ' hidden';
            } 
        else {
            var dose_slide = ' hidden';
            var days_slide = ' hidden';
            var dose_input = '';
            var days_input = '';
            }

        var p_dose = $("<div class='col-sm-4 opt-select'><div>Dose</div><input id='p" + newid + "_dose_v' type='tel' class='form-control" + dose_input + "' name='p" + newid + "_dose_v' value='0 mg'></div>");
        p_dose.appendTo($phase);

        //var p_days = $("<div class='col-sm-4 opt-select'><div class='mobile-duration'>Duration: <span id='p" + newid + "_weeks_v'>0</span><span> weeks</span>, <span id='p" + newid + "_wkday_v'>0</span><span> days</span></div><input id='p" + newid + "_days_v' type='tel' class='form-control col-xs-4" + days_input + "' name='p" + newid + "_days_v' value='0 days'></div>");
        var p_days = $("<div class='col-sm-4 opt-select'><input id='nl_qod_" + newid + "' class='qod' type='checkbox' name='nl_qod_" + newid + "' value='1' tabindex='-1'/><label class='qod-label'>q.o.d.</label><div class='mobile-duration'>Duration: <span id='p" + newid + "_weeks_v'>0</span><span> weeks</span>, <span id='p" + newid + "_wkday_v'>0</span><span> days</span></div><input id='p" + newid + "_days_v' type='tel' class='form-control col-xs-4" + days_input + "' name='p" + newid + "_days_v' value='0 days'></div>");
        p_days.appendTo($phase);

        var p_js = $(" <script> var p"+newid+"_dose = $('#p"+newid+"_dose_v'); p"+newid+"_dose.keypress(function (event) { return isDose(event, this) }); p"+newid+"_dose.on('change', function() { var value = parseFloat($(this).val()); var output = value + ' mg'; $(this).val(output); $('#p"+newid+"_dose_h').html(output); }); var p"+newid+"_days = $('#p"+newid+"_days_v'); p"+newid+"_days.keypress(function (event) { return isDays(event, this) }); p"+newid+"_days.on('change', function() { var value = parseFloat($(this).val()); var output = value + ' days'; $(this).val(output); $('#p"+newid+"_days_h').html(output); $('#p"+newid+"_weeks_v').html(Math.floor(parseInt(value, 10) / 7)); $('#p"+newid+"_wkday_v').html(parseInt(value, 10) % 7); }); </script>");
        p_js.appendTo($phase);

        var p_in = $("<script>$('[id$=" + newid + "_dose_v], [id$=" + newid + "_days_v]').each(function () {var $this = $(this);$this.focus(function (e) {$this.data('" + newid + "_values', $this.val());$this.val('');});$this.blur(function (e) {if ($this.val() == '') {$this.val($this.data('" + newid + "_values'));}});});</script>");
        p_in.appendTo($phase);

        
        $phase.appendTo($('#phases'));

        $('html, body').animate({
            scrollTop: $phase.offset().top
        }, 500);
     */

    });



    /* 
    $("#del_phase").click( function () {    
        var $phase = $( ".phase" ).not(":nth-child(1)").not(":nth-child(2)").not(":nth-child(3)").last();
        var $second = $('phase:nth-last-child(2)');
        $phase.slideToggle('fast', 'linear', function(){ $phase.remove(); });
    });


    $('#phases').on('keydown', '[id$=_days_v]:last', function(e) {
        if (e.which == 9) {
            $('#add_phase').trigger('click');
            //$("#del_phase").trigger("click");
        }
    }); */
});