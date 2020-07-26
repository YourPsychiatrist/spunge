Spunge
---

Simply install the package

```
npm i -g spunge
```

and watch the sponge go brrrrr:

```
spunge Sponging text
#> ThiS iS HOw iT woRKS

spunge < /etc/passwd
#> rOot:x:0:0::/roOt:/BiN/BasH

spunge -c How do I copy text in vim
#> How Do I COpy TeXt iN Vim
#> Text was copied to clipboard!
```

Note that the spunger generates random sponges with good spunge distribution. So, on average, you won't get spunged texts where every letter is lower- or upper-cased. A _good_ spunge distribution is one where the ratio between the number of lowercase and uppercase letters is about 1:1.

```
spunge Imma fuken do it again
#> IMma fUKen Do iT aGAin
spunge Imma fuken do it again
#> ImMa fUKeN Do iT aGaiN
spunge Imma fuken do it again
#> IMma FUkeN Do iT AgaiN
```

---
Disclaimer: I am not responsible for an occasional reactor meltdown that is due to an instability in this npm package.