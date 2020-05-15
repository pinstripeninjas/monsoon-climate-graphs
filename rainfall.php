<?php
$wfo="twc";
$web_title="twc";
$mainpage_title="Monsoon Rainfall";

// This will include the NWSCWI header, menu, and banner
//include ('/var/www/includes/nwscwi-header.php');
include_once('/var/www/includes/standardHeader.php');
include_once ('/var/www/includes/sanitize.inc.php');
?>
<script>wfo="twc";</script>

<style fprolloverstyle>
  A:link {color : #0000ff;text-decoration : none;}
  A:visited {color : #0000ff;text-decoration : none;}
  A:active {color : #0000ff;text-decoration : none;}
  A:hover {color : #ff0000;text-decoration : underline;}
</style>

<script>
function popup(mylink, windowname, w, h)
{
if (! window.focus)return true;
var href;
var rest;
if (typeof(mylink) == 'string')
   href=mylink;
else
   href=mylink.href;
rest="width="+w+",height="+h+",scrollbars=yes,resizable=yes";
window.open(href, windowname, rest);
return false;
}
</script>
<html>
<head>
<title>National Weather Service Tucson Arizona - Monsoon RainFall</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<!-- Local stylesheet -->
<link rel="stylesheet" href="./style.css" />
		<!-- Chart JS and Axios CDN -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

</head>

<body bgcolor="#FFFFFF" text="#000000">
<center>
<table width='95%'>
  <tr><td>&nbsp;</td></tr>
  <tr align="center">
    <td>
      <table width='90%'>
        <tr>
          <td align='center'>
            <div><div><div style="width:960px;">
            <ul class="fwxmenu" style="z-index:1100">
            <li class="top"><a href="/twc/monsoon/monsoon.php" class="top_link"><font color="#f8c00">Menu</font></a></li>
            <li class="top"><a href="/twc/monsoon/monsoon.php" class="top_link">Monsoon statistics</a>
              <ul class="sub" align="left">
                <li><a href="/twc/monsoon/monsoon.php">Tucson</a></li>
                <li><a href="/twc/monsoon/monsoon_phx.php">Phoenix</a></li>
                <li><a href="/twc/monsoon/monsoon_yum.php">Yuma</a></li>
                <li><a href="/twc/monsoon/monsoon_flg.php">Flagstaff</a></li>
                <li><a href="/twc/monsoon/monsoon_elp.php">El Paso</a></li>
                <li><a href="/twc/monsoon/monsoon_abq.php">Albuquerque</a></li>
                <li><a href="/twc/monsoon/monsoon_las.php">Las Vegas</a></li>
                <li><a href="/twc/monsoon/monsoon_igm.php">Kingman</a></li>
                <li><a href="/twc/monsoon/monsoon_psp.php">Palm Springs</a></li>
              </ul>
            </li>
            <li class="top"><a href="/twc/monsoon/dewpoint.php" class="top_link">Dewpoint data</a>
              <ul class="sub" align="left">
                <li><a href="/twc/monsoon/dewpoint.php">Tucson</a></li>
                <li><a href="/twc/monsoon/dewpoint_phx.php">Phoenix</a></li>
                <li><a href="/twc/monsoon/dewpoint_abq.php">Albuquerque</a></li>
              </ul>
            </li>
            <li class="top"><a href="/twc/monsoon/rainfall.php" class="top_link"><font color="#ffffff">Monsoon rainfall</font></a></li>
            <li class="top"><a href="/twc/monsoon/monsoon_info.php" aria-haspopup="true" class="top_link">Monsoon Information</a>
              <ul class="sub" align="left">
                <li><a href="/twc/monsoon/monsoon_whatis.php">What is a monsoon?</a></li>
                <li><a href="/twc/monsoon/monsoon_NA.php">North American Monsoon</a></li>
                <li><a href="/twc/monsoon/monsoon_gulfsurge.php">Gulf Surge</a></li>
                <li><a href="/twc/monsoon/monsoon_progression.php">Monsoon Progression</a></li>
                <li><a href="/twc/monsoon/monsoon_variability.php">Monsoon Inter-annual variability</a></li>
                <li><a href="/twc/monsoon/monsoon_patterns.php">Monsoon Patterns</a></li>
                <li><a href="/twc/monsoon/monsoon_upperlevellows.php">Upper Level Lows</a></li>
                <li><a href="/twc/monsoon/monsoon_safety.php">Monsoon safety</a></li>
                <li><a href="/twc/monsoon/monsoon_references.php">For more reading</a></li>
              </ul>
            </li>
            <li class="top"><a href="/twc/monsoon/monsoon_tracker.php" class="top_link">Tracking the Monsoon</a>
              <ul class="sub" align="left">
                <li><a href="/twc/monsoon/dewpoint_tracker.php">Tucson Dewpoint Tracker</a></li>
                <li><a href="/twc/monsoon/dewpoint_tracker_phx.php">Phoenix Dewpoint Tracker</a></li>
                <li><a href="/twc/monsoon/dewpoint_tracker_yum.php">Yuma Dewpoint Tracker</a></li>
                <li><a href="/twc/monsoon/dewpoint_tracker_flg.php">Flagstaff Dewpoint Tracker</a></li>
                <li><a href="/twc/monsoon/dewpoint_tracker_elp.php">El Paso Dewpoint Tracker</a></li>
              </ul>
           </li>
           </ul></div></div></div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr><td>&nbsp;</td></tr>
</table>

  <!-- Put New Charts Here -->



  <!-- End of Chart Content -->

<table width="95%">
  <tr>
    <td align="center"><font color="#0000ff" size="3">
      <strong>Yearly monsoon rainfall totals across southeast Arizona</strong></font></td>
  </tr>
  <tr>
    <td align="center">
      <table width="90%">
        <tr align="center">
          <td colspan="8"><font size="1">
          (Select a year below for table, then hit back button to 
            return to this page)</font></td>
        </tr>
        <tr><td>&nbsp;</td></tr>
        <tr align="center">
          <td><strong><font size="2"><font size="2"><a href="/twc/monsoon/season/2019monsoon.php">2019</a></font><font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2009monsoon.php">2009</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1999monsoon.php">1999</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1989monsoon.php">1989</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1979monsoon.php">1979</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1969monsoon.php">1969</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1959monsoon.php">1959</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1949monsoon.php">1949</a></font></strong></td>
        </tr>
        <tr align="center">
          <td><strong><font size="2"><font size="2"><a href="/twc/monsoon/season/2018monsoon.php">2018</a></font><font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2008monsoon.php">2008</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1998monsoon.php">1998</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1988monsoon.php">1988</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1978monsoon.php">1978</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1968monsoon.php">1968</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1958monsoon.php">1958</a></font></strong></td>
          <td><strong><font size="2">.</font></strong></td>
        </tr>
        <tr align="center">
          <td><strong><font size="2"><a href="/twc/monsoon/season/2017monsoon.php">2017</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2007monsoon.php">2007</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1997monsoon.php">1997</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1987monsoon.php">1987</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1977monsoon.php">1977</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1967monsoon.php">1967</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1957monsoon.php">1957</a></font></strong></td>
          <td><strong><font size="2">.</font></strong></td>
        </tr>
        <tr align="center">
          <td><strong><font size="2"><a href="/twc/monsoon/season/2016monsoon.php">2016</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2006monsoon.php">2006</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1996monsoon.php">1996</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1986monsoon.php">1986</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1976monsoon.php">1976</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1966monsoon.php">1966</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1956monsoon.php">1956</a></font></strong></td>
          <td><strong><font size="2">.</font></strong></td>
        </tr>
        <tr align="center">
          <td><strong><font size="2"><a href="/twc/monsoon/season/2015monsoon.php">2015</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2005monsoon.php">2005</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1995monsoon.php">1995</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1985monsoon.php">1985</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1975monsoon.php">1975</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1965monsoon.php">1965</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1955monsoon.php">1955</a></font></strong></td>
          <td><strong><font size="2">.</font></strong></td>
        </tr>
        <tr align="center">
          <td><strong><font size="2"><a href="/twc/monsoon/season/2014monsoon.php">2014</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2004monsoon.php">2004</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1994monsoon.php">1994</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1984monsoon.php">1984</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1974monsoon.php">1974</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1964monsoon.php">1964</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1954monsoon.php">1954</a></font></strong></td>
          <td><strong><font size="2">.</font></strong></td>
        </tr>
        <tr align="center">
          <td><strong><font size="2"><a href="/twc/monsoon/season/2013monsoon.php">2013</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2003monsoon.php">2003</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1993monsoon.php">1993</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1983monsoon.php">1983</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1973monsoon.php">1973</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1963monsoon.php">1963</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1953monsoon.php">1953</a></font></strong></td>
          <td><strong><font size="2">.</font></strong></td>
        </tr>
        <tr align="center">
          <td><strong><font size="2"><a href="/twc/monsoon/season/2012monsoon.php">2012</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2002monsoon.php">2002</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1992monsoon.php">1992</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1982monsoon.php">1982</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1972monsoon.php">1972</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1962monsoon.php">1962</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1952monsoon.php">1952</a></font></strong></td>
          <td><strong><font size="2">.</font></strong></td>
        </tr>
        <tr align="center">
          <td><strong><font size="2"><a href="/twc/monsoon/season/2011monsoon.php">2011</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2001monsoon.php">2001</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1991monsoon.php">1991</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1981monsoon.php">1981</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1971monsoon.php">1971</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1961monsoon.php">1961</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1951monsoon.php">1951</a></font></strong></td>
          <td><strong><font size="2">.</font></strong></td>
        </tr>
        <tr align="center">
          <td><strong><font size="2"><a href="/twc/monsoon/season/2010monsoon.php">2010</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/2000monsoon.php">2000</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1990monsoon.php">1990</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1980monsoon.php">1980</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1970monsoon.php">1970</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1960monsoon.php">1960</a></font></strong></td>
          <td><strong><font size="2"><a href="/twc/monsoon/season/1950monsoon.php">1950</a></font></strong></td>
          <td><strong><font size="2">.</font></strong></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr> <td>&nbsp;</td> </tr>
  <tr> <td>&nbsp;</td> </tr>
</table>
</center>
		<!-- Local JS -->
		<script src="./script.js"></script>
</body>
</html>

<?php
// This will include the NWSCWI footer
include"/var/www/includes/standardFooter.php";
?>
