all:	build

bibtex:
	bibtex MagicMirror.aux
build:
	pdflatex --shell-escape --interaction=nonstopmode --interaction=batchmode MagicMirror.tex
	pdflatex --shell-escape --interaction=nonstopmode --interaction=batchmode MagicMirror.tex
clean:
	rm *.log
	rm *.bbl
	rm *.blg
	rm *.pdf
	rm *.aux
	rm *.out
	

