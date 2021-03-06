(function (window) {
  'use strict';
  const DEFAULT_HOSTS = [
    {host: '%', description: 'Any hosts (%)', checked: false},
    {host: 'localhost', description: 'localhost', checked: true},
    {host: '127.0.0.1', description: '127.0.0.1', checked: true}
  ];
  const PRIVILEGES = [
    {privilege: 'CREATE',                  column: 'Create_priv',            context: 'databases, tables, or indexes',         checked: true },
    {privilege: 'DROP',                    column: 'Drop_priv',              context: 'databases, tables, or views',           checked: true },
    {privilege: 'GRANT OPTION',            column: 'Grant_priv',             context: 'databases, tables, or stored routines', checked: false},
    {privilege: 'LOCK TABLES',             column: 'Lock_tables_priv',       context: 'databases',                             checked: true },
    {privilege: 'REFERENCES',              column: 'References_priv',        context: 'databases or tables',                   checked: false},
    {privilege: 'EVENT',                   column: 'Event_priv',             context: 'databases',                             checked: false},
    {privilege: 'ALTER',                   column: 'Alter_priv',             context: 'tables',                                checked: true },
    {privilege: 'DELETE',                  column: 'Delete_priv',            context: 'tables',                                checked: true },
    {privilege: 'INDEX',                   column: 'Index_priv',             context: 'tables',                                checked: true },
    {privilege: 'INSERT',                  column: 'Insert_priv',            context: 'tables or columns',                     checked: true },
    {privilege: 'SELECT',                  column: 'Select_priv',            context: 'tables or columns',                     checked: true },
    {privilege: 'UPDATE',                  column: 'Update_priv',            context: 'tables or columns',                     checked: true },
    {privilege: 'CREATE TEMPORARY TABLES', column: 'Create_tmp_table_priv',  context: 'tables',                                checked: false},
    {privilege: 'TRIGGER',                 column: 'Trigger_priv',           context: 'tables',                                checked: false},
    {privilege: 'CREATE VIEW',             column: 'Create_view_priv',       context: 'views',                                 checked: false},
    {privilege: 'SHOW VIEW',               column: 'Show_view_priv',         context: 'views',                                 checked: false},
    {privilege: 'ALTER ROUTINE',           column: 'Alter_routine_priv',     context: 'stored routines',                       checked: false},
    {privilege: 'CREATE ROUTINE',          column: 'Create_routine_priv',    context: 'stored routines',                       checked: false},
    {privilege: 'EXECUTE',                 column: 'Execute_priv',           context: 'stored routines',                       checked: false},
    {privilege: 'FILE',                    column: 'File_priv',              context: 'file access on server host',            checked: false},
    {privilege: 'CREATE TABLESPACE',       column: 'Create_tablespace_priv', context: 'server administration',                 checked: false},
    {privilege: 'CREATE USER',             column: 'Create_user_priv',       context: 'server administration',                 checked: false},
    {privilege: 'PROCESS',                 column: 'Process_priv',           context: 'server administration',                 checked: false},
    {privilege: 'PROXY',                   column: 'see proxies_priv table', context: 'server administration',                 checked: false},
    {privilege: 'RELOAD',                  column: 'Reload_priv',            context: 'server administration',                 checked: false},
    {privilege: 'REPLICATION CLIENT',      column: 'Repl_client_priv',       context: 'server administration',                 checked: false},
    {privilege: 'REPLICATION SLAVE',       column: 'Repl_slave_priv',        context: 'server administration',                 checked: false},
    {privilege: 'SHOW DATABASES',          column: 'Show_db_priv',           context: 'server administration',                 checked: false},
    {privilege: 'SHUTDOWN',                column: 'Shutdown_priv',          context: 'server administration',                 checked: false},
    {privilege: 'SUPER',                   column: 'Super_priv',             context: 'server administration',                 checked: false}
    //,{privilege: 'ALL [PRIVILEGES]', column: '', context: 'server administration', checked: false},
    // {privilege: 'USAGE', column: '', context: 'server administration', checked: false}
  ];
  const DEFAULT_CHARSET = 'utf8mb4_bin';
  const CHARSETS = [
    {charset: "armscii8",  collation: "armscii8_bin"            },
    {charset: "armscii8",  collation: "armscii8_general_ci"     },
    {charset: "ascii",     collation: "ascii_bin"               },
    {charset: "ascii",     collation: "ascii_general_ci"        },
    {charset: "big5",      collation: "big5_chinese_ci"         },
    {charset: "big5",      collation: "big5_bin"                },
    {charset: "binary",    collation: "binary"                  },
    {charset: "cp1250",    collation: "cp1250_croatian_ci"      },
    {charset: "cp1250",    collation: "cp1250_czech_cs"         },
    {charset: "cp1250",    collation: "cp1250_general_ci"       },
    {charset: "cp1250",    collation: "cp1250_polish_ci"        },
    {charset: "cp1250",    collation: "cp1250_bin"              },
    {charset: "cp1251",    collation: "cp1251_bin"              },
    {charset: "cp1251",    collation: "cp1251_ukrainian_ci"     },
    {charset: "cp1251",    collation: "cp1251_bulgarian_ci"     },
    {charset: "cp1251",    collation: "cp1251_general_cs"       },
    {charset: "cp1251",    collation: "cp1251_general_ci"       },
    {charset: "cp1256",    collation: "cp1256_bin"              },
    {charset: "cp1256",    collation: "cp1256_general_ci"       },
    {charset: "cp1257",    collation: "cp1257_general_ci"       },
    {charset: "cp1257",    collation: "cp1257_bin"              },
    {charset: "cp1257",    collation: "cp1257_lithuanian_ci"    },
    {charset: "cp850",     collation: "cp850_general_ci"        },
    {charset: "cp850",     collation: "cp850_bin"               },
    {charset: "cp852",     collation: "cp852_bin"               },
    {charset: "cp852",     collation: "cp852_general_ci"        },
    {charset: "cp866",     collation: "cp866_bin"               },
    {charset: "cp866",     collation: "cp866_general_ci"        },
    {charset: "cp932",     collation: "cp932_bin"               },
    {charset: "cp932",     collation: "cp932_japanese_ci"       },
    {charset: "dec8",      collation: "dec8_bin"                },
    {charset: "dec8",      collation: "dec8_swedish_ci"         },
    {charset: "eucjpms",   collation: "eucjpms_bin"             },
    {charset: "eucjpms",   collation: "eucjpms_japanese_ci"     },
    {charset: "euckr",     collation: "euckr_bin"               },
    {charset: "euckr",     collation: "euckr_korean_ci"         },
    {charset: "gb18030",   collation: "gb18030_chinese_ci"      },
    {charset: "gb18030",   collation: "gb18030_unicode_520_ci"  },
    {charset: "gb18030",   collation: "gb18030_bin"             },
    {charset: "gb2312",    collation: "gb2312_bin"              },
    {charset: "gb2312",    collation: "gb2312_chinese_ci"       },
    {charset: "gbk",       collation: "gbk_bin"                 },
    {charset: "gbk",       collation: "gbk_chinese_ci"          },
    {charset: "geostd8",   collation: "geostd8_bin"             },
    {charset: "geostd8",   collation: "geostd8_general_ci"      },
    {charset: "greek",     collation: "greek_general_ci"        },
    {charset: "greek",     collation: "greek_bin"               },
    {charset: "hebrew",    collation: "hebrew_bin"              },
    {charset: "hebrew",    collation: "hebrew_general_ci"       },
    {charset: "hp8",       collation: "hp8_bin"                 },
    {charset: "hp8",       collation: "hp8_english_ci"          },
    {charset: "keybcs2",   collation: "keybcs2_bin"             },
    {charset: "keybcs2",   collation: "keybcs2_general_ci"      },
    {charset: "koi8r",     collation: "koi8r_bin"               },
    {charset: "koi8r",     collation: "koi8r_general_ci"        },
    {charset: "koi8u",     collation: "koi8u_bin"               },
    {charset: "koi8u",     collation: "koi8u_general_ci"        },
    {charset: "latin1",    collation: "latin1_german2_ci"       },
    {charset: "latin1",    collation: "latin1_spanish_ci"       },
    {charset: "latin1",    collation: "latin1_danish_ci"        },
    {charset: "latin1",    collation: "latin1_general_cs"       },
    {charset: "latin1",    collation: "latin1_swedish_ci"       },
    {charset: "latin1",    collation: "latin1_general_ci"       },
    {charset: "latin1",    collation: "latin1_german1_ci"       },
    {charset: "latin1",    collation: "latin1_bin"              },
    {charset: "latin2",    collation: "latin2_czech_cs"         },
    {charset: "latin2",    collation: "latin2_bin"              },
    {charset: "latin2",    collation: "latin2_croatian_ci"      },
    {charset: "latin2",    collation: "latin2_hungarian_ci"     },
    {charset: "latin2",    collation: "latin2_general_ci"       },
    {charset: "latin5",    collation: "latin5_turkish_ci"       },
    {charset: "latin5",    collation: "latin5_bin"              },
    {charset: "latin7",    collation: "latin7_estonian_cs"      },
    {charset: "latin7",    collation: "latin7_bin"              },
    {charset: "latin7",    collation: "latin7_general_cs"       },
    {charset: "latin7",    collation: "latin7_general_ci"       },
    {charset: "macce",     collation: "macce_bin"               },
    {charset: "macce",     collation: "macce_general_ci"        },
    {charset: "macroman",  collation: "macroman_general_ci"     },
    {charset: "macroman",  collation: "macroman_bin"            },
    {charset: "sjis",      collation: "sjis_bin"                },
    {charset: "sjis",      collation: "sjis_japanese_ci"        },
    {charset: "swe7",      collation: "swe7_bin"                },
    {charset: "swe7",      collation: "swe7_swedish_ci"         },
    {charset: "tis620",    collation: "tis620_bin"              },
    {charset: "tis620",    collation: "tis620_thai_ci"          },
    {charset: "ucs2",      collation: "ucs2_slovak_ci"          },
    {charset: "ucs2",      collation: "ucs2_unicode_520_ci"     },
    {charset: "ucs2",      collation: "ucs2_bin"                },
    {charset: "ucs2",      collation: "ucs2_swedish_ci"         },
    {charset: "ucs2",      collation: "ucs2_esperanto_ci"       },
    {charset: "ucs2",      collation: "ucs2_romanian_ci"        },
    {charset: "ucs2",      collation: "ucs2_lithuanian_ci"      },
    {charset: "ucs2",      collation: "ucs2_croatian_ci"        },
    {charset: "ucs2",      collation: "ucs2_general_ci"         },
    {charset: "ucs2",      collation: "ucs2_spanish_ci"         },
    {charset: "ucs2",      collation: "ucs2_persian_ci"         },
    {charset: "ucs2",      collation: "ucs2_latvian_ci"         },
    {charset: "ucs2",      collation: "ucs2_danish_ci"          },
    {charset: "ucs2",      collation: "ucs2_german2_ci"         },
    {charset: "ucs2",      collation: "ucs2_estonian_ci"        },
    {charset: "ucs2",      collation: "ucs2_roman_ci"           },
    {charset: "ucs2",      collation: "ucs2_general_mysql500_ci"},
    {charset: "ucs2",      collation: "ucs2_icelandic_ci"       },
    {charset: "ucs2",      collation: "ucs2_czech_ci"           },
    {charset: "ucs2",      collation: "ucs2_sinhala_ci"         },
    {charset: "ucs2",      collation: "ucs2_polish_ci"          },
    {charset: "ucs2",      collation: "ucs2_spanish2_ci"        },
    {charset: "ucs2",      collation: "ucs2_vietnamese_ci"      },
    {charset: "ucs2",      collation: "ucs2_unicode_ci"         },
    {charset: "ucs2",      collation: "ucs2_turkish_ci"         },
    {charset: "ucs2",      collation: "ucs2_hungarian_ci"       },
    {charset: "ucs2",      collation: "ucs2_slovenian_ci"       },
    {charset: "ujis",      collation: "ujis_japanese_ci"        },
    {charset: "ujis",      collation: "ujis_bin"                },
    {charset: "utf16",     collation: "utf16_polish_ci"         },
    {charset: "utf16",     collation: "utf16_spanish2_ci"       },
    {charset: "utf16",     collation: "utf16_vietnamese_ci"     },
    {charset: "utf16",     collation: "utf16_unicode_ci"        },
    {charset: "utf16",     collation: "utf16_turkish_ci"        },
    {charset: "utf16",     collation: "utf16_hungarian_ci"      },
    {charset: "utf16",     collation: "utf16_slovenian_ci"      },
    {charset: "utf16",     collation: "utf16_slovak_ci"         },
    {charset: "utf16",     collation: "utf16_unicode_520_ci"    },
    {charset: "utf16",     collation: "utf16_bin"               },
    {charset: "utf16",     collation: "utf16_swedish_ci"        },
    {charset: "utf16",     collation: "utf16_esperanto_ci"      },
    {charset: "utf16",     collation: "utf16_romanian_ci"       },
    {charset: "utf16",     collation: "utf16_lithuanian_ci"     },
    {charset: "utf16",     collation: "utf16_croatian_ci"       },
    {charset: "utf16",     collation: "utf16_general_ci"        },
    {charset: "utf16",     collation: "utf16_spanish_ci"        },
    {charset: "utf16",     collation: "utf16_persian_ci"        },
    {charset: "utf16",     collation: "utf16_latvian_ci"        },
    {charset: "utf16",     collation: "utf16_danish_ci"         },
    {charset: "utf16",     collation: "utf16_german2_ci"        },
    {charset: "utf16",     collation: "utf16_estonian_ci"       },
    {charset: "utf16",     collation: "utf16_roman_ci"          },
    {charset: "utf16",     collation: "utf16_icelandic_ci"      },
    {charset: "utf16",     collation: "utf16_czech_ci"          },
    {charset: "utf16",     collation: "utf16_sinhala_ci"        },
    {charset: "utf16le",   collation: "utf16le_bin"             },
    {charset: "utf16le",   collation: "utf16le_general_ci"      },
    {charset: "utf32",     collation: "utf32_slovenian_ci"      },
    {charset: "utf32",     collation: "utf32_slovak_ci"         },
    {charset: "utf32",     collation: "utf32_unicode_520_ci"    },
    {charset: "utf32",     collation: "utf32_bin"               },
    {charset: "utf32",     collation: "utf32_swedish_ci"        },
    {charset: "utf32",     collation: "utf32_esperanto_ci"      },
    {charset: "utf32",     collation: "utf32_romanian_ci"       },
    {charset: "utf32",     collation: "utf32_lithuanian_ci"     },
    {charset: "utf32",     collation: "utf32_croatian_ci"       },
    {charset: "utf32",     collation: "utf32_general_ci"        },
    {charset: "utf32",     collation: "utf32_spanish_ci"        },
    {charset: "utf32",     collation: "utf32_persian_ci"        },
    {charset: "utf32",     collation: "utf32_latvian_ci"        },
    {charset: "utf32",     collation: "utf32_danish_ci"         },
    {charset: "utf32",     collation: "utf32_german2_ci"        },
    {charset: "utf32",     collation: "utf32_estonian_ci"       },
    {charset: "utf32",     collation: "utf32_roman_ci"          },
    {charset: "utf32",     collation: "utf32_icelandic_ci"      },
    {charset: "utf32",     collation: "utf32_czech_ci"          },
    {charset: "utf32",     collation: "utf32_sinhala_ci"        },
    {charset: "utf32",     collation: "utf32_polish_ci"         },
    {charset: "utf32",     collation: "utf32_spanish2_ci"       },
    {charset: "utf32",     collation: "utf32_vietnamese_ci"     },
    {charset: "utf32",     collation: "utf32_unicode_ci"        },
    {charset: "utf32",     collation: "utf32_turkish_ci"        },
    {charset: "utf32",     collation: "utf32_hungarian_ci"      },
    {charset: "utf8",      collation: "utf8_swedish_ci"         },
    {charset: "utf8",      collation: "utf8_esperanto_ci"       },
    {charset: "utf8",      collation: "utf8_romanian_ci"        },
    {charset: "utf8",      collation: "utf8_lithuanian_ci"      },
    {charset: "utf8",      collation: "utf8_croatian_ci"        },
    {charset: "utf8",      collation: "utf8_general_ci"         },
    {charset: "utf8",      collation: "utf8_spanish_ci"         },
    {charset: "utf8",      collation: "utf8_persian_ci"         },
    {charset: "utf8",      collation: "utf8_latvian_ci"         },
    {charset: "utf8",      collation: "utf8_danish_ci"          },
    {charset: "utf8",      collation: "utf8_german2_ci"         },
    {charset: "utf8",      collation: "utf8_estonian_ci"        },
    {charset: "utf8",      collation: "utf8_roman_ci"           },
    {charset: "utf8",      collation: "utf8_general_mysql500_ci"},
    {charset: "utf8",      collation: "utf8_icelandic_ci"       },
    {charset: "utf8",      collation: "utf8_czech_ci"           },
    {charset: "utf8",      collation: "utf8_sinhala_ci"         },
    {charset: "utf8",      collation: "utf8_polish_ci"          },
    {charset: "utf8",      collation: "utf8_spanish2_ci"        },
    {charset: "utf8",      collation: "utf8_vietnamese_ci"      },
    {charset: "utf8",      collation: "utf8_unicode_ci"         },
    {charset: "utf8",      collation: "utf8_turkish_ci"         },
    {charset: "utf8",      collation: "utf8_hungarian_ci"       },
    {charset: "utf8",      collation: "utf8_slovenian_ci"       },
    {charset: "utf8",      collation: "utf8_slovak_ci"          },
    {charset: "utf8",      collation: "utf8_unicode_520_ci"     },
    {charset: "utf8",      collation: "utf8_bin"                },
    {charset: "utf8mb4",   collation: "utf8mb4_slovenian_ci"    },
    {charset: "utf8mb4",   collation: "utf8mb4_slovak_ci"       },
    {charset: "utf8mb4",   collation: "utf8mb4_unicode_520_ci"  },
    {charset: "utf8mb4",   collation: "utf8mb4_bin"             },
    {charset: "utf8mb4",   collation: "utf8mb4_swedish_ci"      },
    {charset: "utf8mb4",   collation: "utf8mb4_esperanto_ci"    },
    {charset: "utf8mb4",   collation: "utf8mb4_romanian_ci"     },
    {charset: "utf8mb4",   collation: "utf8mb4_lithuanian_ci"   },
    {charset: "utf8mb4",   collation: "utf8mb4_croatian_ci"     },
    {charset: "utf8mb4",   collation: "utf8mb4_general_ci"      },
    {charset: "utf8mb4",   collation: "utf8mb4_spanish_ci"      },
    {charset: "utf8mb4",   collation: "utf8mb4_persian_ci"      },
    {charset: "utf8mb4",   collation: "utf8mb4_latvian_ci"      },
    {charset: "utf8mb4",   collation: "utf8mb4_danish_ci"       },
    {charset: "utf8mb4",   collation: "utf8mb4_german2_ci"      },
    {charset: "utf8mb4",   collation: "utf8mb4_estonian_ci"     },
    {charset: "utf8mb4",   collation: "utf8mb4_roman_ci"        },
    {charset: "utf8mb4",   collation: "utf8mb4_icelandic_ci"    },
    {charset: "utf8mb4",   collation: "utf8mb4_czech_ci"        },
    {charset: "utf8mb4",   collation: "utf8mb4_sinhala_ci"      },
    {charset: "utf8mb4",   collation: "utf8mb4_polish_ci"       },
    {charset: "utf8mb4",   collation: "utf8mb4_spanish2_ci"     },
    {charset: "utf8mb4",   collation: "utf8mb4_vietnamese_ci"   },
    {charset: "utf8mb4",   collation: "utf8mb4_unicode_ci"      },
    {charset: "utf8mb4",   collation: "utf8mb4_turkish_ci"      },
    {charset: "utf8mb4",   collation: "utf8mb4_hungarian_ci"    }
  ];

  function createCheckboxLabel(params) {
    var label = document.createElement('label');
    if (params !== undefined) {
      for (var i in params) {
        label[i] = params[i];
      }
    }
    label.className += ' mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';
    return label;
  }

  function createInput(params) {
    var input = document.createElement('input');
    for (var i in params) {
      input[i] = params[i];
    }
    return input;
  }

  function createHostCheckboxes() {
    for (var i = 0, len = DEFAULT_HOSTS.length; i < len; i++) {
      var label = createCheckboxLabel({className: 'host-checkbox-label'});
      var input = createInput({
        value: DEFAULT_HOSTS[i].host,
        type: 'checkbox',
        className: 'mdl-checkbox__input hostname',
        checked: DEFAULT_HOSTS[i].checked
      });
      if (input.value == '%') {
        input.addEventListener('change', function (evt) {
          var checked = this.checked;
          document.querySelectorAll('.host-checkbox-label').forEach(function (elem) {
            var value = elem.querySelector('input[type="checkbox"]').value;
            if (value != '%') {
              if (checked) {
                elem.MaterialCheckbox.disable();
              } else {
                elem.MaterialCheckbox.enable();
              }
            }
          });
          if (checked) {
            document.getElementById('otherhosts').disabled = true;
          } else {
            document.getElementById('otherhosts').disabled = false;
          }
        }, false);
      }
      label.appendChild(input);
      var labelText = document.createTextNode(DEFAULT_HOSTS[i].host);
      label.appendChild(labelText);
      componentHandler.upgradeElement(label);
      document.getElementById('preset-hosts').appendChild(label);
    }
  }

  function createPrivilegeCheckboxes() {
    for (var i = 0, len = PRIVILEGES.length; i < len; i++) {
      var label = createCheckboxLabel({className: 'privilege-checkbox-label ' + (PRIVILEGES[i].checked ? 'recommended' : '')});
      var input = createInput({
        value: PRIVILEGES[i].privilege,
        type: 'checkbox',
        className: 'mdl-checkbox__input privilege-checkbox ' + (PRIVILEGES[i].checked ? 'recommended' : ''),
        checked: PRIVILEGES[i].checked
      });
      label.appendChild(input);
      var labelText = document.createTextNode(PRIVILEGES[i].privilege + ' ');
      var em = document.createElement('em');
      em.appendChild(document.createTextNode('(' + PRIVILEGES[i].column + ')'));
      label.appendChild(labelText);
      label.appendChild(em);
      componentHandler.upgradeElement(label);
      document.getElementById('privileges').appendChild(label);
    }
  }

  function getGroupedCharsets() {
    var list = {};
    for (var i = 0, len = CHARSETS.length; i < len; i++) {
      var label = CHARSETS[i].charset;
      if (list[label] === undefined) {
        list[label] = [];
      }
      list[label].push(CHARSETS[i]);
    }
    return list;
  }

  function createCharsetSelectList() {
    var charsets = getGroupedCharsets();
    for (var i in charsets) {
      var optgroup = document.createElement('optgroup');
      optgroup.label = i;
      for (var j = 0, len = charsets[i].length; j < len; j++) {
        var option = document.createElement('option');
        option.selected = (charsets[i][j].collation == DEFAULT_CHARSET);
        option.value = JSON.stringify(charsets[i][j]);
        option.innerHTML = charsets[i][j].collation;
        optgroup.appendChild(option);
      }
      document.getElementById('charset').appendChild(optgroup);
    }
  }

  function setPrivilegeHandler() {
    document.querySelectorAll('.privilege-handler').forEach(function (obj) {
      obj.addEventListener('click', function () {
        var com = this.getAttribute('data-command');
        var elems = document.querySelectorAll('.privilege-checkbox-label');
        switch (this.getAttribute('data-command')) {
          case 'recommended':
            elems.forEach(function (elem) {
              elem.MaterialCheckbox.uncheck();
              if (elem.className.match(/recommended/)) {
                elem.MaterialCheckbox.check();
              }
            });
            break;
          case 'check-all':
            elems.forEach(function (elem) {
              elem.MaterialCheckbox.check();
            });
            break;
          case 'uncheck-all':
            elems.forEach(function (elem) {
              elem.MaterialCheckbox.uncheck();
            });
            break;
        }
      }, false);
    });
  }

  /**
   * Statement Generator
   * Class declaration
   */
  var StatementGenerator = function () {
    this.database = document.getElementById('database').value;
    this.username = document.getElementById('username').value;
    this.password = document.getElementById('password').value;
    this.hosts = this.getHosts();
    this.privs = this.getPrivs();

    var charsetElem = document.getElementById('charset');
    this.charset = JSON.parse(charsetElem.options[charsetElem.selectedIndex].value);
  };

  /**
   * Statement Generator
   * Class methods
   */
  StatementGenerator.prototype = {
    /**
     * Get lists of checked or written hostnames
     *
     * @return {Array}
     */
    getHosts: function () {
      var i,
        len,
        result = [],
        elems = document.querySelectorAll('input.hostname');
      for (i = 0, len = elems.length; i < len; i++) {
        if (!elems[i].disabled && elems[i].checked) {
          result.push(elems[i].value);
        }
      }
      var otherhosts = document.getElementById('otherhosts').value.split('\n');
      if (!otherhosts.disabled) {
        for (i = 0, len = otherhosts.length; i < len; i++) {
          if (otherhosts[i].length > 0) {
            result.push(otherhosts[i]);
          }
        }
      }
      return result;
    },

    /**
     * Get lists of checked privileges
     *
     * @return {Array}
     */
    getPrivs: function () {
      var i,
        len,
        result = [],
        elems = document.querySelectorAll('input.privilege-checkbox');
      for (i = 0, len = elems.length; i < len; i++) {
        if (elems[i].checked) {
          result.push(elems[i].value);
        }
      }
      if (elems.length === result.length) {
        return ['ALL PRIVILEGES'];
      }
      return result;
    },

    /**
     * Generate initializing SQL for MySQL
     *
     * @return {string}
     */
    generate: function () {
      var result = [],
        tmpResult = [].concat([this.generateCreateDatabase()], this.generateCreateUser(), this.generateGrant());
      for (var i = 0, len = tmpResult.length; i < len; i++) {
        if (tmpResult[i].length > 0) {
          result.push(tmpResult[i]);
        }
      }
      return result.join('\n');
    },

    /**
     * Generate CREATE DATABASE statement
     *
     * @return {string}
     */
    generateCreateDatabase: function () {
      if (this.database.length > 0) {
        return sprintf('CREATE DATABASE `%s` CHARACTER SET %s COLLATE %s;', this.database, this.charset.charset, this.charset.collation);
      }
      return '';
    },

    /**
     * Generate CREATE USER statements
     *
     * @return {Array}
     */
    generateCreateUser: function () {
      var result = [];
      if (this.username.length > 0 && this.password.length > 0 && this.hosts.length > 0) {
        for (var i = 0, len = this.hosts.length; i < len; i++) {
          result.push(sprintf("CREATE USER '%s'@'%s' IDENTIFIED BY '%s';", this.username, this.hosts[i], this.password));
        }
      }
      return result;
    },

    /**
     * Generate GRANT statements
     *
     * @return {Array}
     */
    generateGrant: function () {
      var result = [],
        priv = this.privs.join(', ');
      if (this.database.length > 0 && this.username.length > 0 && this.hosts.length > 0) {
        for (var i = 0, len = this.hosts.length; i < len; i++) {
          result.push(sprintf("GRANT %s ON `%s`.* TO '%s'@'%s';", priv, this.database, this.username, this.hosts[i]));
        }
      }
      return result;
    }
  };

  function initDialogs() {
    document.querySelectorAll('dialog').forEach(function (dialog) {
      if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
    });
    setGeneratingHandler();
  }

  function setGeneratingHandler() {
    document.querySelectorAll('.generate').forEach(function (elem) {
      elem.addEventListener('click', function () {
        var gen = new StatementGenerator(),
          statement = gen.generate();
        console.log(gen.generate());
        var dialog = document.querySelector('dialog#' + this.getAttribute('data-dialog-id'));
        dialog.querySelector('.mdl-dialog__title').innerHTML = this.getAttribute('data-dialog-title');
        dialog.querySelector('.mdl-dialog__content').innerHTML = '<pre>' + statement + '</pre>';
        dialog.showModal();
      }, false);
    });
  }

  window.addEventListener('load', function () {
    createHostCheckboxes();
    createPrivilegeCheckboxes();
    createCharsetSelectList();
    setPrivilegeHandler();
    initDialogs();
  }, false);
})(window);
