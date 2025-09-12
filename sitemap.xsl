<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap</title>
        <style>
          body { font-family: Arial, sans-serif; background:#f9f9f9; color:#333; margin:20px; }
          h1 { color:#2c3e50; }
          p { margin-bottom:15px; }
          table { width:100%; border-collapse: collapse; margin-top:20px; }
          th, td { padding:8px; border:1px solid #ddd; text-align:left; font-size:14px; }
          tr:nth-child(even){ background:#f2f2f2; }
          a { color:#2980b9; text-decoration:none; }
          a:hover { text-decoration:underline; }
        </style>
      </head>
      <body>
        <h1>📑 Sitemap</h1>
        <p>List of pages on the website <strong>achmadzailani.my.id</strong>.</p>
        <table>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
            <th>Priority</th>
          </tr>
          <xsl:for-each select="/sitemap:urlset/sitemap:url">
            <tr>
              <td><a href="{sitemap:loc}" target="_blank"><xsl:value-of select="sitemap:loc"/></a></td>
              <td><xsl:value-of select="sitemap:lastmod"/></td>
              <td><xsl:value-of select="sitemap:priority"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
