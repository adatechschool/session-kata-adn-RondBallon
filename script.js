fetch('fichier_adn.txt') // fetch sur le fichier local qui contient la séquence ADN
    .then(reponse => {
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP ! statut : ${reponse.status}`); // si erreur HTTP
        }
        return reponse.text();  // si pas d'erreur, retourne le contenu du fichier
    })
    .then(sequence => {
        console.log('Séquence ADN chargée :', sequence);
        traiterADN(sequence);  // appel à la fonction qui traite la séquence ADN
        decouperEnGroupesde25(sequence);  // appel de la fonction pour faire les 25 groupes
    })
    .catch(erreur => console.error('Erreur lors du chargement du fichier :', erreur));

function traiterADN(sequence) { // fonction qui traite la séquence ADN
    // Découper en codons
    const codons = []; //  tableau pour stocker les codons
    for (let i = 0; i < sequence.length; i += 3) { // boucle pour parcourir la séquence ADN de 3 en 3
        codons.push(sequence.slice(i, i + 3));
    }

    // Traduire les codons en protéines
    const codonVersProtéine = {
        'ATA': 'I', 'ATC': 'I', 'ATT': 'I', 'ATG': 'M',
        'ACA': 'T', 'ACC': 'T', 'ACG': 'T', 'ACT': 'T',
        'AAC': 'N', 'AAT': 'N', 'AAA': 'K', 'AAG': 'K',
        'AGC': 'S', 'AGT': 'S', 'AGA': 'R', 'AGG': 'R',
        'CTA': 'L', 'CTC': 'L', 'CTG': 'L', 'CTT': 'L',
        'CCA': 'P', 'CCC': 'P', 'CCG': 'P', 'CCT': 'P',
        'CAC': 'H', 'CAT': 'H', 'CAA': 'Q', 'CAG': 'Q',
        'CGA': 'R', 'CGC': 'R', 'CGG': 'R', 'CGT': 'R',
        'GTA': 'V', 'GTC': 'V', 'GTG': 'V', 'GTT': 'V',
        'GCA': 'A', 'GCC': 'A', 'GCG': 'A', 'GCT': 'A',
        'GAC': 'D', 'GAT': 'D', 'GAA': 'E', 'GAG': 'E',
        'GGA': 'G', 'GGC': 'G', 'GGG': 'G', 'GGT': 'G',
        'TCA': 'S', 'TCC': 'S', 'TCG': 'S', 'TCT': 'S',
        'TTC': 'F', 'TTT': 'F', 'TTA': 'L', 'TTG': 'L',
        'TAC': 'Y', 'TAT': 'Y', 'TAA': '_', 'TAG': '_',
        'TGC': 'C', 'TGT': 'C', 'TGA': '_', 'TGG': 'W'
    };

    let protéines = ''; // variable pour stocker les protéines
    for (let i = 0; i < codons.length; i++) { // boucle pour parcourir les codons
        let codon = codons[i]; // variable pour stocker un codon
        if (codonVersProtéine[codon]) { // si le codon est traduit en protéine
            protéines += codonVersProtéine[codon]; // ajouter la protéine au tableau
        } else {
            protéines += 'pas de correspondance'; // sinon afficher "pas de correspondance" 
        }
    }
    console.log('Protéines :', protéines); // afficher les protéines
}

function decouperEnGroupesde25(sequence) { // fonction pour faire les 25 groupes
    const groupesDe25 = []; // tableau pour stocker les groupes
    for (let i = 0; i < sequence.length; i += 25) { // boucle pour parcourir la séquence ADN de 25 en 25
        groupesDe25.push(sequence.slice(i, i + 25)); // ajouter le groupe au tableau
    }

    // log du découpage
    console.log("Groupes de 25 nucléotides:");
    console.log(groupesDe25);
}

/* function decouperEnGroupesDe5(groupesDe25) { // pas réussis
    const GroupesDe5 = []; // 

    // Parcourir chaque groupe de 25
    groupesDe25.forEach(groupe => {
        for (let i = 0; i < groupe.length; i += 5) {
    */ 

    
