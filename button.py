import tkinter as tk
from tkinter import StringVar

class RadioButtonApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Radio Button Example")

        # Variabel untuk pilihan utama
        self.main_choice = StringVar(value='0')

        # Frame untuk pilihan utama
        self.main_frame = tk.Frame(self.root)
        self.main_frame.pack(pady=10)

        tk.Label(self.main_frame, text="Pilih 1 atau 0:").pack()

        # Radio button untuk pilihan utama
        tk.Radiobutton(self.main_frame, text="1", variable=self.main_choice, value='1', command=self.on_main_choice_change).pack(anchor=tk.W)
        tk.Radiobutton(self.main_frame, text="0", variable=self.main_choice, value='0', command=self.on_main_choice_change).pack(anchor=tk.W)

        # Frame untuk pilihan kedua
        self.sub_frame = tk.Frame(self.root)
        tk.Label(self.sub_frame, text="Pilih salah satu dari opsi berikut:").pack()

        # Radio button kedua yang dinonaktifkan secara default
        self.option_on = tk.Radiobutton(self.sub_frame, text="On", value="On", state="disabled")
        self.option_on.pack(anchor=tk.W)

        self.option_off = tk.Radiobutton(self.sub_frame, text="Off", value="Off", state="disabled")
        self.option_off.pack(anchor=tk.W)

        self.option_semi = tk.Radiobutton(self.sub_frame, text="Semi", value="Semi", state="disabled")
        self.option_semi.pack(anchor=tk.W)

        # Menampilkan frame sub di awal
        self.sub_frame.pack(pady=10)  # Selalu tampil meskipun radio button dinonaktifkan

    def on_main_choice_change(self):
        if self.main_choice.get() == '1':
            # Enable radio buttons jika 1 dipilih
            self.option_on.config(state='normal')
            self.option_off.config(state='normal')
            self.option_semi.config(state='normal')
        else:
            # Disable radio buttons jika 0 dipilih
            self.option_on.config(state='disabled')
            self.option_off.config(state='disabled')
            self.option_semi.config(state='disabled')

if __name__ == "__main__":
    root = tk.Tk()
    app = RadioButtonApp(root)
    root.mainloop()
