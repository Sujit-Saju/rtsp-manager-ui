import { createTheme, Theme } from '@mui/material/styles';

export const getMuiTheme = (isDarkMode: boolean): Theme => {
  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#0071e3', // Classic premium enterprise blue accent
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#10b981', // Emerald green for alerts and online status
        contrastText: '#ffffff',
      },
      background: {
        default: isDarkMode ? '#09090b' : '#f4f5f6', // Zinc-950 and zinc-100-like
        paper: isDarkMode ? '#18181b' : '#ffffff', // Zinc-900 and white
      },
      text: {
        primary: isDarkMode ? '#f4f4f5' : '#18181b',
        secondary: isDarkMode ? '#a1a1aa' : '#52525b',
      },
      divider: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 700,
      },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            padding: '6px 16px',
            fontSize: '0.8125rem',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
          },
        },
      },
    },
  });
};


export const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#92400e',       // Deep amber-brown
      light: '#b45309',
      dark: '#6b2d0a',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#d97706',       // Warm amber glow
      light: '#f59e0b',
      dark: '#b45309',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8f7f4',    // Warm cream canvas
      paper: '#fdfcf9'       // Slightly lighter warm white for surfaces
    },
    text: {
      primary: '#1c1917',    // Warm near-black
      secondary: '#78716c'   // Warm stone gray
    },
    divider: 'rgba(120, 90, 40, 0.10)',
    success: {
      main: '#4d7c0f',
      light: '#ecfccb',
      dark: '#365314',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#d97706',
      light: '#fef3c7',
      dark: '#92400e',
      contrastText: '#ffffff'
    },
    error: {
      main: '#b91c1c',
      light: '#fee2e2',
      dark: '#7f1d1d',
      contrastText: '#ffffff'
    },
    info: {
      main: '#0c4a6e',
      light: '#e0f2fe',
      dark: '#082f49',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Inter", "Space Grotesk", sans-serif',
    h4: {
      fontWeight: 800,
      fontFamily: '"Space Grotesk", sans-serif',
      color: '#1c1917',
      letterSpacing: '-0.02em'
    },
    h5: {
      fontWeight: 800,
      fontFamily: '"Space Grotesk", sans-serif',
      color: '#1c1917',
      letterSpacing: '-0.02em'
    },
    h6: {
      fontWeight: 700,
      fontFamily: '"Space Grotesk", sans-serif',
      color: '#1c1917',
      letterSpacing: '-0.01em'
    },
    subtitle1: {
      fontWeight: 600,
      color: '#1c1917'
    },
    subtitle2: {
      fontWeight: 600,
      color: '#292524'
    },
    body1: {
      color: '#292524'
    },
    body2: {
      color: '#78716c'
    },
    caption: {
      color: '#a8a29e'
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.01em'
    }
  },
  shape: {
    borderRadius: 16
  },
  shadows: [
    'none',
    '0 1px 2px rgba(28,15,0,0.05)',
    '0 1px 4px rgba(28,15,0,0.06), 0 1px 2px rgba(28,15,0,0.04)',
    '0 2px 8px rgba(28,15,0,0.07), 0 1px 3px rgba(28,15,0,0.05)',
    '0 4px 12px rgba(28,15,0,0.08), 0 2px 4px rgba(28,15,0,0.05)',
    '0 6px 16px rgba(28,15,0,0.08), 0 2px 6px rgba(28,15,0,0.05)',
    '0 8px 20px rgba(28,15,0,0.09), 0 3px 8px rgba(28,15,0,0.06)',
    '0 10px 24px rgba(28,15,0,0.09), 0 4px 8px rgba(28,15,0,0.06)',
    '0 12px 28px rgba(28,15,0,0.10), 0 4px 10px rgba(28,15,0,0.06)',
    '0 14px 32px rgba(28,15,0,0.10), 0 5px 12px rgba(28,15,0,0.07)',
    '0 16px 36px rgba(28,15,0,0.11), 0 6px 14px rgba(28,15,0,0.07)',
    '0 18px 40px rgba(28,15,0,0.11), 0 6px 16px rgba(28,15,0,0.07)',
    '0 20px 44px rgba(28,15,0,0.12), 0 7px 18px rgba(28,15,0,0.08)',
    '0 22px 48px rgba(28,15,0,0.12), 0 8px 20px rgba(28,15,0,0.08)',
    '0 24px 52px rgba(28,15,0,0.13), 0 8px 22px rgba(28,15,0,0.08)',
    '0 26px 56px rgba(28,15,0,0.13), 0 9px 24px rgba(28,15,0,0.09)',
    '0 28px 60px rgba(28,15,0,0.14), 0 10px 26px rgba(28,15,0,0.09)',
    '0 30px 64px rgba(28,15,0,0.14), 0 10px 28px rgba(28,15,0,0.09)',
    '0 32px 68px rgba(28,15,0,0.15), 0 11px 30px rgba(28,15,0,0.10)',
    '0 34px 72px rgba(28,15,0,0.15), 0 12px 32px rgba(28,15,0,0.10)',
    '0 36px 76px rgba(28,15,0,0.16), 0 12px 34px rgba(28,15,0,0.10)',
    '0 38px 80px rgba(28,15,0,0.16), 0 13px 36px rgba(28,15,0,0.11)',
    '0 40px 84px rgba(28,15,0,0.17), 0 14px 38px rgba(28,15,0,0.11)',
    '0 42px 88px rgba(28,15,0,0.17), 0 14px 40px rgba(28,15,0,0.11)',
    '0 4px 24px rgba(146,64,14,0.12), 0 1px 4px rgba(146,64,14,0.08)',
  ] as any,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8f7f4',
          color: '#1c1917'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(248, 247, 244, 0.88)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(120, 90, 40, 0.10)',
          color: '#1c1917',
          boxShadow: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          boxShadow: 'none',
          fontWeight: 600,
          '&:hover': {
            boxShadow: 'none'
          }
        },
        containedPrimary: {
          background: '#92400e',
          boxShadow: '0 1px 3px rgba(146,64,14,0.25), 0 0 0 1px rgba(146,64,14,0.12)',
          '&:hover': {
            background: '#78350f',
            boxShadow: '0 4px 12px rgba(146,64,14,0.28), 0 0 0 1px rgba(146,64,14,0.18)'
          }
        },
        containedSecondary: {
          background: '#d97706',
          boxShadow: '0 1px 3px rgba(217,119,6,0.25)',
          '&:hover': {
            background: '#b45309',
            boxShadow: '0 4px 12px rgba(217,119,6,0.30)'
          }
        },
        outlined: {
          borderColor: 'rgba(120, 90, 40, 0.18)',
          color: '#1c1917',
          '&:hover': {
            borderColor: '#92400e',
            backgroundColor: 'rgba(146,64,14,0.04)'
          }
        },
        outlinedPrimary: {
          borderColor: 'rgba(146,64,14,0.30)',
          '&:hover': {
            borderColor: '#92400e',
            backgroundColor: 'rgba(146,64,14,0.04)'
          }
        },
        outlinedError: {
          borderColor: 'rgba(185,28,28,0.25)',
          '&:hover': {
            borderColor: '#b91c1c',
            backgroundColor: 'rgba(185,28,28,0.04)'
          }
        },
        text: {
          color: '#78716c',
          '&:hover': {
            backgroundColor: 'rgba(120,90,40,0.06)',
            color: '#1c1917'
          }
        }
      } as any
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#fdfcf9',
          border: '1px solid rgba(120, 90, 40, 0.09)'
        },
        elevation0: {
          boxShadow: 'none'
        },
        elevation1: {
          boxShadow: '0 1px 4px rgba(28,15,0,0.06), 0 1px 2px rgba(28,15,0,0.04)',
          border: '1px solid rgba(120,90,40,0.09)'
        },
        elevation2: {
          boxShadow: '0 2px 8px rgba(28,15,0,0.07), 0 1px 3px rgba(28,15,0,0.05)',
          border: '1px solid rgba(120,90,40,0.09)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#fdfcf9',
          border: '1px solid rgba(120,90,40,0.09)',
          boxShadow: '0 1px 4px rgba(28,15,0,0.06), 0 1px 2px rgba(28,15,0,0.04)',
          transition: 'all 0.25s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(28,15,0,0.09), 0 2px 6px rgba(28,15,0,0.06)',
            borderColor: 'rgba(146,64,14,0.22)'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fdfcf9',
          color: '#1c1917',
          borderRadius: '24px',
          boxShadow: '0 24px 64px rgba(28,15,0,0.13), 0 4px 24px rgba(146,64,14,0.07)',
          border: '1px solid rgba(120,90,40,0.10)'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#1c1917',
          borderBottom: '1px solid rgba(120,90,40,0.09)'
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: '1px solid rgba(120,90,40,0.09)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#f5f3ef',
            color: '#1c1917',
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(120,90,40,0.15)'
            },
            '&:hover fieldset': {
              borderColor: '#b45309'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#92400e',
              borderWidth: '1.5px'
            }
          },
          '& .MuiInputLabel-root': {
            color: '#a8a29e'
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#92400e'
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#a8a29e',
            opacity: 1
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f3ef',
          color: '#1c1917',
          borderRadius: '12px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(120,90,40,0.15)'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b45309'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#92400e',
            borderWidth: '1.5px'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '8px'
        },
        colorPrimary: {
          backgroundColor: '#fef3c7',
          color: '#78350f',
          border: '1px solid rgba(146,64,14,0.18)'
        },
        colorSecondary: {
          backgroundColor: '#fffbeb',
          color: '#92400e',
          border: '1px solid rgba(217,119,6,0.20)'
        },
        colorSuccess: {
          backgroundColor: '#f7fee7',
          color: '#365314',
          border: '1px solid rgba(77,124,15,0.18)'
        },
        colorError: {
          backgroundColor: '#fff1f2',
          color: '#7f1d1d',
          border: '1px solid rgba(185,28,28,0.18)'
        },
        colorWarning: {
          backgroundColor: '#fef3c7',
          color: '#92400e',
          border: '1px solid rgba(217,119,6,0.20)'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#a8a29e',
          '&:hover': {
            backgroundColor: 'rgba(146,64,14,0.07)',
            color: '#92400e'
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(120,90,40,0.10)'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#292524',
          color: '#fef3c7',
          fontSize: '12px',
          borderRadius: '8px',
          padding: '6px 10px'
        },
        arrow: {
          color: '#292524'
        }
      }
    },
    MuiBadge: {
      styleOverrides: {
        colorError: {
          backgroundColor: '#b91c1c'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#292524',
          fontSize: '14px',
          '&:hover': {
            backgroundColor: '#fef3c7',
            color: '#78350f'
          },
          '&.Mui-selected': {
            backgroundColor: '#fef9ee',
            color: '#78350f',
            '&:hover': {
              backgroundColor: '#fef3c7'
            }
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid rgba(146,64,14,0.18)',
          boxShadow: '0 2px 8px rgba(146,64,14,0.10)'
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#d6c5a8',
          '&.Mui-checked': {
            color: '#92400e'
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: '#292524'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#a8a29e',
          '&.Mui-focused': {
            color: '#92400e'
          }
        }
      }
    }
  }
});